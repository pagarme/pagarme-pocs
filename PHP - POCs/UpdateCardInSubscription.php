<?php
	Require("pagarme-php/Pagarme.php");
	PagarMe::setApiKey("SUA_API");
	$card = new PagarMe_Card(array(
		'card_number' => '4111111111111111',
		'card_holder_name' => 'Jose',
		'card_expiration_month' => '10',
		'card_expiration_year' => '19',
		'card_cvv' => '223'
	));

	$card->create();
	print_r($card->id);
	$subscription = PagarMe_Subscription::findById('75672');
	$subscription->payment_method = 'credit_card';
	$subscription->setCard($card);
	$subscription->save();
?>
