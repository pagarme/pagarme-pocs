<?php

require("pagarme-php/Pagarme.php");

PagarMe::setApiKey("SUA_API");

$TransactionCommon = new PagarMe_TransactionCommon();
$split_rules = $TransactionCommon->getSplitRules(543065);

print_r($split_rules);

?>
