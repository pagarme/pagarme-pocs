<?php

require_once("../pagarme-php/Pagarme.php");
header("Content-Type: text/html; charset=utf-8");
$Token = @$_GET["token"];

try
{
	if (isSet($Token))
	{
		Pagarme::setApiKey("ak_test_qtDOZfF5K0VDn17k04NxnQPIZ3r5wV");

		$Transaction = PagarMe_Transaction::findById($Token);
		$Transaction->capture(1000);	

		echo json_encode(array($Token => $Transaction));
	}
	else
		throw new Exception("Token não informado");
}
catch (Exception $ex)
{
	echo $ex->getMessage();
}

?>