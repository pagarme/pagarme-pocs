<?php
header('Content-Type: text/html; charset=UTF-8');
require("../pagarme-php/Pagarme.php"); 

/*
 * O valor de captura deve ser o mesmo valor com o qual a transação foi criada
 * no Checkout. O parametro amount deve ser validado pelo back-end, nunca
 * confie no amount que é enviado pelo checkout, pois ele pode ser alterado
 * por seu usuário através do front-end.
 */
$amount = 8000;
$token = $_POST['token']; //Token enviado pelo checkout pagar.me

Pagarme::setApiKey("SUA_CHAVE_DE_API");

try{
    $transaction = PagarMe_Transaction::findById($token); // Encontra a transação através do token enviado pelo checkout
    $transaction->capture($amount); // Captura a transação encontrada préviamente.

    /* Em caso de sucesso, retorna o ID da transação para a página do checkout */
    echo $transaction->id;
    header('HTTP/1.0 200 Transação capturada com sucesso');
} catch (PagarMe_Exception $e) {
    /* Em caso de erro, retorna o erro para a página do checkout */
    echo $e->getMessage();
    header('HTTP/1.0 400 Falha ao capturar a transação');
}

