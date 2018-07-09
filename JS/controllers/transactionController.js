const pagarme = require('pagarme')
var fs = require('fs')

function createTransaction(transactionData,customerData,addressData,itemsData){
	return new Promise(function (resolve,reject){
		var credentials = JSON.parse(fs.readFileSync('./storage/env.json','utf8'));
		var data = {};
		pagarme.client.connect({ api_key: credentials.api_key })
		.then(client => client.transactions.create({
			amount: transactionData.amount,
			payment_method: transactionData.payment_method,
			installments: transactionData.installments,
			card_hash: transactionData.card_hash,
			customer: customerData,
			billing: addressData.billing,
			shipping: addressData.shipping,
			split_rules: transactionData.split_rules,
			items: itemsData
			
		}))
		.then(transaction => {
			console.log(JSON.stringify(transaction));
				data = {
					statusCode: 200,
					msg: 'Sua transação foi criada com sucesso',
					payment_method: transaction.payment_method,
					boleto_url: transaction.boleto_url
				}
				
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
	createTransaction
}