<?php
	Require("pagarme-php/Pagarme.php");
	PagarMe::setApiKey("SUA_API");
	$card = new PagarMe_Card(array(
		'card_number' => '4242424242424242',
		'card_holder_name' => 'Jose',
		'card_expiration_month' => '10',
		'card_expiration_year' => '19',
		'card_cvv' => '223'
	));
	//$card->card_hash = $card->generateCardHash();
	$card_hash = $card->generateCardHash();
	echo "<pre>";
	//print_r($card->id);
	$subscription = new PagarMe_Subscription(array(
		'plan_id' => '51409',
		'card_hash' => $card_hash,
		'customer' => PagarMe_Customer::findById("81715")
	));
	$subscription->create();
	print_r($subscription);

	echo "</pre>";
?>

