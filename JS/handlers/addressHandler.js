function getAddressToCreateTransaction(req, res){

	var address = {
		street: req.body.customer.address.street,
		street_number: req.body.customer.address.number,
		complementary: req.body.customer.address.complementary,
		neighborhood: req.body.customer.address.neighborhood,
		zipcode: req.body.customer.address.zip,
		city: req.body.customer.address.city,
		state: req.body.customer.address.state, 
		country: 'br'
	}
	var data = {
		billing: {
			name: req.body.customer.name,
			address: address

		},
		shipping:{
			name: req.body.customer.name,
			fee: 0,
			address: address
		}


	}
	return new Promise(function(resolve,reject){
		resolve(data)
		reject("Error")
	})
}

function getAddressToCreateSubscription(req,res){
	var address = {
		street: req.body.customer.address.street,
		street_number: req.body.customer.address.number,
		complementary: req.body.customer.address.complementary,
		neighborhood: req.body.customer.address.neighborhood,
		zipcode: req.body.customer.address.zip,
		city: req.body.customer.address.city,
		state: req.body.customer.address.state
	}
	return new Promise(function(resolve,reject){
		resolve(address)
		reject("Error")
	})
}

module.exports = {
	getAddressToCreateTransaction,
	getAddressToCreateSubscription
}


