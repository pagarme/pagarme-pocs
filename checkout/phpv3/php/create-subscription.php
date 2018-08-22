<?php
header('Content-Type: text/html; charset=UTF-8');
require("../vendor/autoload.php"); 

/*
 * Este exemplo foi criado com um plano que aceitava
 * boleto e cartão de crédito como meio de pagamento
 */
$pagarMe = new \PagarMe\Sdk\PagarMe('SUA_CHAVE_DE_API');

$planId = 284012;

$checkoutCustomer = $_POST['customer']; // Dados do cliente enviados pelo checkout
$paymentMethod = $_POST['payment_method']; // Meio de pagamento selecionado no checkout

/* Cria um customer de acordo com os dados enviados pelo cliente no checkout */

$customer = new \PagarMe\Sdk\Customer\Customer(
    [
        'name' => $checkoutCustomer['name'],
        'email' => $checkoutCustomer['email'],
        'document_number' => $checkoutCustomer['document_number'],
        'address' => new \PagarMe\Sdk\Customer\Address($checkoutCustomer['address']),
        'phone' => new \PagarMe\Sdk\Customer\Phone($checkoutCustomer['phone']),
        'born_at' => '15021994',
        'sex' => 'M'

    ]
);

$metadata = ['idAssinatura' => '123']; // Define um metadata para assinatura

try {
    /* 
     * Essa chamada pode gerar uma exception, por isso está dentro do try
     * Cria um objeto plano de acordo com o ID do plano definido na variável planId
     */
    $plan = $pagarMe->plan()->get($planId);

    if($paymentMethod == 'credit_card') {
        /* Recebe o card_hash gerado pelo checkout caso o meio de
         * pagamento seja cartão de crédito e o parametro customerData
         * esteja configurado com o valor 'false'
         */
        $cardHash = $_POST['card_hash']; // Recebe o card_hash gerado pelo checkout

        /* 
         * Cria um cartão, com base no card_hash enviado pelo checkout 
         * se o meio de pagamento for cartão de crédito 
         */
        $card = $pagarMe->card()->createFromHash($cardHash);

        $subscription = $pagarMe->subscription()->createCardSubscription(
            $plan,
            $card,
            $customer,
            'http://requestb.in/zyn5obzy',
            $metadata
        );
    } else if($paymentMethod == 'boleto') { 
        $subscription = $pagarMe->subscription()->createBoletoSubscription(
            $plan,
            $customer,
            'http://requestb.in/zyn5obzy',
            $metadata
        );
    }

    /* Em caso de sucesso, retorna o ID da transação para a página do checkout */
    echo $subscription->getId();
    header('HTTP/1.0 200 Assinatura criada com sucesso');

} catch (Exception $exception) {
    /* Em caso de erro, retorna o erro para a página do checkout */
    $exception = json_decode($exception->getMessage());

    foreach ($exception->errors as $error) {
        echo $error->message . " ";
    }
    header('HTTP/1.0 400 Falha ao criar a assinatura');
}

