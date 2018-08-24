const pagarme = require('pagarme')
var fs = require('fs')

function createSubscription(subscriptionData,customerData,addressData){
	return new Promise(function (resolve,reject){
		var credentials = JSON.parse(fs.readFileSync('./storage/env.json','utf8'));
		var data = {};
		console.log(subscriptionData.plan_id)
		pagarme.client.connect({ api_key: credentials.api_key })
		.then(client => client.subscriptions.create({
			payment_method: subscriptionData.payment_method,
			card_hash: subscriptionData.card_hash,
			customer: customerData,
			plan_id: subscriptionData.plan_id,
			address: addressData
		}))
		.then(subscription => {
			console.log(JSON.stringify(subscription));
				data = {
					statusCode: 200,
					msg: 'Sua assinatura foi criada com sucesso',
					payment_method: subscription.payment_method
				}
				console.log(data);
				resolve(data);
		})
		.catch(error => {
			console.log(JSON.stringify(error))
			data = {
				statusCode: 400,
				msg: error.response.errors
			}
			resolve(data);
		})	
	});		
}

module.exports = {
	createSubscription
}