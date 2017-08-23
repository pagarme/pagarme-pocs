<?php
  require __DIR__."/vendor/autoload.php";

  $apiKey = "SUA API KEY";
  $pagarme =  new \PagarMe\Sdk\PagarMe($apiKey);

  const bankCode = "341";

  $agenciaA = "99999";
  $contaA = "99999";
  $digitoContaA = "9";
  $documentA = "63421293040";
  $legalNameA = "CONTA BANCARIA TESTE A";
  $digitoAgenciaA = "9";

  $bankAccountA = $pagarme->bankAccount()->create(
    bankCode,
    $agenciaA,
    $contaA,
    $digitoContaA,
    $documentA,
    $legalNameA,
    $digitoAgenciaA
  );

  $agenciaB = "88888";
  $contaB = "88888";
  $digitoContaB = "8";
  $documentB = "81706869037";
  $legalNameB = "CONTA BANCARIA TESTE B";
  $digitoAgenciaB = "8";

  $bankAccountB = $pagarme->bankAccount()->create(
    bankCode,
    $agenciaB,
    $contaB,
    $digitoContaB,
    $documentB,
    $legalNameB,
    $digitoAgenciaB
  );

  $transferInterval = "weekly";
  $transferDay = 0;
  $transferEnabled = true;
  $automaticAnticipationEnabled = false;
  $anticipatableVolumePercentage = 80;

  $recipientA = $pagarme->Recipient()->create(
    $bankAccountA,
    $transferInterval,
    $transferDay,
    $transferEnabled,
    $automaticAnticipationEnabled,
    $anticipatableVolumePercentage
  );

  $recipientB = $pagarme->Recipient()->create(
    $bankAccountB,
    $transferInterval,
    $transferDay,
    $transferEnabled,
    $automaticAnticipationEnabled,
    $anticipatableVolumePercentage
  );

  $cardNumber = "4111111111111111";
  $holderName = "Kaua Azevedo Oliveira";
  $cardExpirationDate = "0621";
  $card = $pagarme->Card()->create($cardNumber, $holderName, $cardExpirationDate);

  $address = new \PagarMe\Sdk\Customer\Address([
    "street" => "Passagem Santa Clarao",
    "streetNumber" => "753",
    "neighborhood" => "Sacramenta",
    "zipcode" => "66120353",
    "complementary" => "Casa",
    "city" => "Belem",
    "state" => "Para"
  ]);

  $phone = new \PagarMe\Sdk\Customer\Phone([
    "ddd" => "11",
    "number" => "9999-9999"
  ]);

  $customer = new \PagarMe\Sdk\Customer\Customer([
    "name" => "Cliente Teste PHP",
    "email" => "cliente@php.com",
    "documentNumber" => "46686036196",
    "address" => $address,
    "phone" => $phone,
    "bornAt" => "18081952",
    "gender" => "m"
  ]);

  $splitRuleA = $pagarme->splitRule()->percentageRule(
    50,
    $recipientA,
    true,
    true
  );

  $splitRuleB = $pagarme->splitRule()->percentageRule(
    50,
    $recipientB,
    true,
    true
  );

  $splitRules = new PagarMe\Sdk\SplitRule\SplitRuleCollection();
  $splitRules[0] = $splitRuleA;
  $splitRules[1] = $splitRuleB;

  $amount = 10000;
  $installments = 6;
  $capture = "true";
  $transaction = $pagarme->transaction()->CreditCardTransaction(
    $amount,
    $card,
    $customer,
    $installments,
    $capture,
    null,
    null,
    [ "splitRules" => $splitRules ]
  );

  var_dump( $transaction );

?>
