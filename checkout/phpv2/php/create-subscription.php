<?php
header('Content-Type: text/html; charset=UTF-8');
require("../pagarme-php/Pagarme.php"); 

Pagarme::setApiKey("SUA_CHAVE_DE_API");

/*
 * Este exemplo foi criado com um plano que aceitava
 * boleto e cartão de crédito como meio de pagamento
 */
$plan_id = '284012';

$customer = $_POST['customer']; // Dados do cliente enviados pelo checkout
$payment_method = $_POST['payment_method']; // Meio de pagamento selecionado no checkout

$subscriptionData = array(
    'customer' => $customer,
    'payment_method' => $payment_method,
    'plan_id' => $plan_id
);

/* Envia o card_hash se o meio de pagamento for cartão de crédito */
if($payment_method == 'credit_card') {
    $subscriptionData['card_hash'] = $_POST['card_hash'];
}

try{
    $subscription = new PagarMe_Subscription($subscriptionData); // Configura os dados da assinatura para o objeto Subscription.

    $subscription->create(); // Cria a assinatura

    /* Em caso de sucesso, retorna o ID da transação para a página do checkout */
    echo $subscription->id;
    header('HTTP/1.0 200 Assinatura criada com sucesso');
} catch (PagarMe_Exception $e) {
    /* Em caso de erro, retorna o erro para a página do checkout */
    echo $e->getMessage();
    header('HTTP/1.0 400 Falha ao criar a assinatura');
}

