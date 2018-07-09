function getTransactionData(req,res){
	var split_rules;
	if(req.body.transactionInformation.split_rules === 'yes'){
		split_rules = [
			{
				recipient_id: req.body.transactionInformation.default_recipient_id,
				percentage: 5, 
				liable: true,
				charge_processing_fee: true
			},
			{
				recipient_id: req.body.transactionInformation.sec_recipient,
				percentage: 95,
				liable: true,
				charge_processing_fee: true
			}
		
		]
	} else {
		split_rules = null
	}
	var transactionData = {
		amount: req.body.transactionInformation.amount,
		split_rules: split_rules
	}
	if(req.body.transactionInformation.payment_method === 'cartao'){
		transactionData.payment_method = 'credit_card',
		transactionData.installments = req.body.transactionInformation.installments,
		transactionData.card_hash = req.body.transactionInformation.hash
	} else{
		transactionData.payment_method = 'boleto'
		transactionData.hash = '';
	}
	return new Promise(function(resolve,reject){
		resolve(transactionData)
		reject("Error")
	})
}

module.exports = {
	getTransactionData
}

