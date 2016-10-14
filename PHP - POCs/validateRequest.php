<?php

require("pagarme/Pagarme.php");


Pagarme::setApiKey("SUA_API");

$data = date("d/m/Y");
$hora = date("H:i:s.u");
$manipular = fopen("teste.txt", "a+b");

if(PagarMe::validateRequestSignature(file_get_contents("php://input"), getallheaders()['X-Hub-Signature'])) {
	fwrite($manipular, "[$data $hora] Valid Signature (" . getallheaders()['X-Hub-Signature'] . ")\r\n");
	fclose($manipular);
}
else
{
	fwrite($manipular, "[$data $hora] Erro ao validar assinatura (" . getallheaders()['X-Hub-Signature'] . ")\r\n");
	fclose($manipular);

?>
