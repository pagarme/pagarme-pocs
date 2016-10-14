<?php

header("Content-Type: text/html; charset=utf-8");
require_once("D:/php/pagarme-checkout/pagarme/tests/Pagarme.php");

PagarMe::setApiKey("SUA_API");

try
{
	$Transaction = new PagarMe_TransactionTest();
	$Transaction->testCalculateInstallmentsAmount();
}
catch (Exception $ex)
{
	echo $ex->getMessage();
}

?>
