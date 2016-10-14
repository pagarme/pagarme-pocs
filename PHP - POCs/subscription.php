<?php

header("Content-Type: text/html; charset=utf-8");
require_once("pagarme-php/Pagarme.php");

PagarMe::setApiKey("SUA_API");

try
{
	// Criar
	// $Plan = new PagarMe_Plan
	// (
	// 	array
	// 	(
	// 		"amount" => "2000",
	// 		"days" => 15,
	// 		"name" => "Plano Bronzódia",
	// 		"trial_days" => 0
	// 	)
	// );
	// $Plan->create();

	$Plan         = PagarMe_Plan::findById("63143");

	$Subscription = new PagarMe_Subscription
	(
		array
		(
			"plan" => $Plan->id,
			//"card_number" => "4242424242424242",
			//	"card_holder_name" => "Potynho",
			//	"card_expiration_month" => 11,
			//	"card_expiration_year" => 21,
			//	"card_cvv" => "423",
			'customer' => array
			(
				'email' => 'EMAIL'
			),
			"payment_method"=> "boleto",
			"async"=> "false"
		)
	);
	$Subscription->create();

	 // Alterar
	 //$Subscription = PagarMe_Subscription::findById("101264");
	 //$Plan         = PagarMe_Plan::findById("63143");
	 //$Subscription->setPlan($Plan);
	 //$Subscription->save();

	 //$Subscription->setStatus("paid");
	 //$Subscription->save();
	 $Transaction = new PagarMe_Transaction();
    $Transaction = $Subscription->current_transaction;
	 //$Transaction = PagarMe_Transaction::findById($Transaction->id); 		 
	 $Transaction->setStatus("paid");
	 $Transaction->save();
	 $AtualSubscription = PagarMe_Subscription::findById("101268");

	// Printar
	echo "<pre>";
	print_r($Plan);
	print_r($Subscription->id);
	print_r($Subscription->status);
	print_r($Transaction->status);
	print_r($AtualSubscription->status);
	echo "</pre>";
}
catch (Exception $ex)
{
	echo $ex->getMessage();
}

?>
