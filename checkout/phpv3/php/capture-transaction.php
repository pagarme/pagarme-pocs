<?php
header('Content-Type: text/html; charset=UTF-8');
require("../vendor/autoload.php"); 

/*
 * O valor de captura deve ser o mesmo valor com o qual a transação foi criada
 * no Checkout. O parametro amount deve ser validado pelo back-end, nunca
 * confie no amount que é enviado pelo checkout, pois ele pode ser alterado
 * por seu usuário através do front-end.
 */
$captureAmount = 8000;

$token = $_POST['token']; //Token enviado pelo checkout pagar.me

$pagarMe = new \PagarMe\Sdk\PagarMe('SUA_API_KEY');

try{
    $transaction = $pagarMe->transaction()->get($token);
    $pagarMe->transaction()->capture($transaction, $captureAmount);

    /* Em caso de sucesso, retorna o ID da transação para a página do checkout */
    echo $transaction->getId();
    header('HTTP/1.0 200 Transação capturada com sucesso');
} catch (Exception $exception) {

    /* Em caso de erro, retorna o erro para a página do checkout */
    $exception = json_decode($exception->getMessage());

    foreach ($exception->errors as $error) {
        echo $error->message;
    }
    header('HTTP/1.0 400 Falha ao capturar a transação');
}

