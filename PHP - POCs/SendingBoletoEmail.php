<?php
	
	$restClient  = new RestClient([
		'url'=> 'https://api.pagar.me/1/transactions/774409/collect_payment',
		'method' => 'POST',
		'parameters'=> [
			'api_key' => 'SUA_API',
			'email' => 'SEU_EMAIL'
		],
	]);
	
	$restClient->run();
print_r($restClient);
