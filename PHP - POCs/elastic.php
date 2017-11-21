<?php

$api_key = 'SUA_API_KEY';

$params = json_encode(
	array(
		"query" => array(
			"filtered" => array(
				"query" => array(
					"match_all" => array()),
						"filter" => array(
							"and" => [ array(
									"range" => array(
											"date_created" => array (
													"lte" => '2017-11-21', // Data no formato 2017-XX-XX
													"gte" => '2017-11-20' // Data no formato 2017-XX-XX

												)
										)
								),
								array(
									"or" => [
										array(
											"term" => array("status" => "waiting_payment")),
										array(
											"term" => array("status"=> "paid")),
										array(
											"term"=> array("metadata.CAMPO" => [
													"VALOR DO CAMPO"
												]))
									]
								)
						]
					)
				)
			)
		)
);

$url = "https://api.pagar.me/1/search?api_key=$api_key&type=transaction&query=$params";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET"); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); 
$res = curl_exec($ch);
curl_close($ch);	

print_r($res);

?>