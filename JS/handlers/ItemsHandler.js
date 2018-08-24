function getItems(req, res){

	var items = [{
		unit_price: req.body.transactionInformation.amount,
		id: req.body.transactionInformation.item_name, 
		title: req.body.transactionInformation.item_name,
		quantity: 1,
		tangible: true
	}]

	return new Promise(function(resolve,reject){
		resolve(items)
		reject("Error")
	})
}

module.exports = {
	getItems
}

