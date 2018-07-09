function getSubscriptionData(req,res){
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
	var subscriptionData = {
		plan_id: req.body.transactionInformation.plan_id,
		split_rules: split_rules
	}
	if(req.body.transactionInformation.payment_method === 'cartao'){
		subscriptionData.payment_method = 'credit_card',
		subscriptionData.card_hash = req.body.transactionInformation.hash
	} else{
		subscriptionData.payment_method = 'boleto'
		subscriptionData.hash = '';
	}
	return new Promise(function(resolve,reject){
		resolve(subscriptionData)
		reject("Error")
	})
}

module.exports = {
	getSubscriptionData
}