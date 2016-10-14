<?php

header("Content-Type: text/html; charset=utf-8");
require_once("pagarme-php/Pagarme.php");

				// "document_number" => "17107537903",
try
{
	$api = "SUA_API";
	Pagarme::setApiKey($api);

	$card = new PagarMe_Card(array(
		"card_number"=>"4111111111111111",
		"card_holder_name"=>"Josefa",
		"card_cvv"=>"123",
		"card_expiration_month"=>"02",
		"card_expiration_year"=>"19"
	));

	$card->create();

	$bank = new Pagarme_Bank_Account(array(
		"bank_code"=> "100",
		"agencia"=>"123",
		"agencia_dv"=>"1",
		"conta"=>"123456",
		"conta_dv"=>"1",
		"document_number"=>"41027023851",
		"legal_name"=>"banco_teste"		
	));

	$bank->create();

	$recipient = new PagarMe_Recipient(array(
		"transfer_interval" => "weekly",
		"transfer_day"=>"5",
		"transfer_enabled"=>"false",
		"bank_account_id"=>$bank->id
	));

	$recipient->create();

	$req = array(
        "payment_method" => "credit_card",
        "card_id" => $card2->id,
        "amount" => "10000",
        "postback_url" => "http://dominiopagar.esy.es/postback.php",
        "soft_descriptor" => "", //descricao que aparece na fatura to cart�o.
        "installments" => "2",
        "customer" => array(
            "name" => "jose",
            "document_number" => "41027023851",
            "born_at" => "01012000",
            "email" => "pdc187@gmail.com",
            "address" => array(
                "neighborhood" => "BAIRRO",
                "street" => "RUA",
                "street_number" => "RUA",
                "complementary" => "56",
                "zipcode" => "04446160"
            ),
            "phone" => array( 	
                "ddd" => "11",
                "number" => "56112432"
            )
        ),
		"async" => "false"
    );
	//print_r($req);
	$Transaction= new PagarMe_Transaction($req);
	$Transaction->charge();
 	//$TransactionActive= PagarMe_Transaction::findById($Transaction->id);
	//$Transaction->setStatus("paid");
	//$Transaction->save();
	$Payable= PagarMe_Payable::findAllByTransactionId($Transaction->id);

	echo "<pre>";
	print_r($Transaction);
	//print_r($Payable);
	print_r($bank);
	print_r($recipient);
	echo "</pre>";
}
catch (Exception $ex)
{
	echo $ex->getMessage();
}

?>
