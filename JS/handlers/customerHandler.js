function getCustomerToCreateTransaction(req, res){
	var doc_type = 'cpf'
	if(req.body.customer.person_type === 'corporation'){
		doc_type = 'cnpj';
	}
	var customer = {
		email: req.body.customer.email, 
		name: req.body.customer.name,
		birthday: req.body.customer.birthday,
		type: req.body.customer.person_type,
		phone_numbers: ['+'+req.body.customer.phone],
		external_id: req.body.customer.document_number,
		country: 'br',
		documents: [
				{
					type: doc_type,
					number: req.body.customer.document_number
				}
		],		
	}
	return new Promise(function(resolve,reject){
		resolve(customer)
		reject("Error")
	})
}

function getCustomerToCreateSubscription(req,res){
	var customer = {
		email: req.body.customer.email, 
		name: req.body.customer.name,
		birthday: req.body.customer.birthday,
		document_number: req.body.customer.document_number		
	}
	return new Promise(function(resolve,reject){
		resolve(customer)
		reject("Error")
	})
}
module.exports = {
	getCustomerToCreateTransaction,
	getCustomerToCreateSubscription
}
