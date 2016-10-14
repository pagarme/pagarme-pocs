<?php
    require("pagarme-php/Pagarme.php");

    Pagarme::setApiKey("SUA_API");

    $transaction = new PagarMe_Transaction(array(
        "amount" => 1000,
        "card_hash" => $_POST["card_hash"]
    ));

    $transaction->charge();

    $status = $transaction->status;

    if($status === "paid"){
    	echo "<script>alert('Seu pagamento foi efetuado com sucesso!')</script>";// status da transação
    	echo '<meta HTTP-EQUIV="Refresh" CONTENT="1; URL=index.html">';
    }else{
    	echo "<script>alert('Erro. Por favor, tente novamente mais tarde')</script>";
    }
?>
