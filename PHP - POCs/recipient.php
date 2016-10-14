<?php

header("Content-Type: text/html; charset=utf-8");
require_once("pagarme/Pagarme.php");

try
{
	Pagarme::setApiKey("SUA_API");

	// id 1: 14077357
	// id 2: 14077358

	// $BankAccount = PagarMe_Bank_Account::findById("14077357");
	// $Recipient   = PagarMe_Recipient::findById("re_cip5rzorf00bke66dzgae3j6j");
	// $Recipient->transfer_interval = "weekly";
	// $Recipient->bank_account_id   = $BankAccount->id;

	// $Recipient->save();

	// $Recipients = PagarMe_Recipient::all(1, 10);

	// foreach ($Recipients as $Recipient)
	// {
	// 	$Recipient->setAutomaticAnticipationEnabled(true);
	// 	$Recipient->save();

	// 	echo "<pre>";
	// 	print_r($Recipient);
	// 	echo "</pre>";
	// }

	$Recipient = PagarMe_Recipient::findById("re_cip5rzorf00bke66dzgae3j6j");
	$Recipient->setTransferDay(15);
	$Recipient->setTransferInterval("daily");
	$Recipient->save();

	echo "<pre>";
	print_r($Recipient);
	echo "</pre>";
}
catch (Exception $ex)
{
	echo $ex->getMessage();
}

?>
