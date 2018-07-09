const pagarme = require('pagarme')
var express = require('express')
var request = require('request')
var router = express.Router()
var fs = require('fs')
var customerHandler = require('../handlers/customerHandler.js')
var addressHandler = require('../handlers/addressHandler.js')
var itemsHandler = require('../handlers/ItemsHandler.js')
var transactionHandler = require('../handlers/transactionHandler.js')
var transactionController = require('../controllers/transactionController.js')
var subscriptionHandler = require('../handlers/subscriptionHandler.js')
var subscriptionController = require('../controllers/subscriptionController.js')

router.get('/', function(req, res) {
	if(fs.existsSync('./storage/env.json','utf8')){
		res.render('grid');
	} else {
		res.render('env');
	}
});

router.get('/setDefault',function(req,res){
	var content = {
		"api_key": "ak_test_qeTyygnxIfVSjRAETtL4LXCH3H0SSm",
		"encryption_key": "ek_test_doAgNCp6z9m7W3Mszn6x5HKy0oq8dK"
	}
	fs.writeFileSync('./storage/env.json',JSON.stringify(content),'utf-8');
	res.render('grid');
})

router.post('/setCustom',function(req,res){
	var content = {
		"api_key": req.body.api_key,
		"encryption_key": req.body.encryption_key
	}
	fs.writeFileSync('./storage/env.json',JSON.stringify(content),'utf-8');
	res.render('grid'); 
})

router.get('/productRender',function(req,res){
	var products = JSON.parse(fs.readFileSync('./storage/products.json','utf8'));
	var prodcut = null;
	for(var i = 0; i < products.length;i++){
		if(req.query.id === products[i].id){
			product = products[i];
		}
	}
	res.cookie('product', product);
	res.render('producPage',{product: product})
})


router.get('/checkout', function (req,res){
	var customer = JSON.parse(fs.readFileSync('./storage/customer.json','utf8'));
	var credentials = JSON.parse(fs.readFileSync('./storage/env.json','utf8'));
	pagarme.client.connect({ api_key: credentials.api_key })
		  .then(client => client.transactions.calculateInstallmentsAmount({
		    max_installments: 12,
		    free_installments: 3,
		    interest_rate: 5,
		    amount: req.cookies.product.price
	 }))
    .then(installments => {
    	res.render('checkoutForm', {product: req.cookies.product, customer: customer,installments: installments,encryption_key:credentials.encryption_key});
   	}) 
	
	
});

router.get('/cart', function(req,res){
	res.render('cart');
});


router.post('/createSubscription', function(req,res){
	var customerData,subscriptionData,addresData;
	customerHandler.getCustomerToCreateSubscription(req,res).then(customer_data => {
		customerData  = customer_data;
		addressHandler.getAddressToCreateSubscription(req,res).then(address_data =>{
			addressData = address_data;
				subscriptionHandler.getSubscriptionData(req,res).then(subscription_data =>{
					subscriptionData = subscription_data;
					subscriptionController.createSubscription(subscriptionData,customerData,addressData).then(subscription_response => {
						if(subscription_response.statusCode == 200){
							if(subscription_response.payment_method === 'boleto'){
								res.cookie('msg', subscription_response.boleto_url)
								res.send('boleto')
							}else {
								res.cookie('msg', subscription_response.msg);
								res.send('Ok');
							}
						} else {
							res.cookie('error',subscription_response.msg);
							res.send('Not Ok')
						}
					});
				
				})
			}) 
		})
});
	
router.post('/createTransaction',function(req,res){
	var customerData,transactionData,addresData,itemsData;
	customerHandler.getCustomerToCreateTransaction(req,res).then(customer_data => {
		customerData  = customer_data;
		addressHandler.getAddressToCreateTransaction(req,res).then(address_data =>{
			addressData = address_data;
			itemsHandler.getItems(req,res).then(items =>{
				itemsData= items;
				transactionHandler.getTransactionData(req,res).then(transaction_data =>{
					transactionData = transaction_data;
					transactionController.createTransaction(transactionData,customerData,addressData,itemsData).then(transaction_response => {
						if(transaction_response.statusCode == 200){
							if(transaction_response.payment_method === 'boleto'){
								res.cookie('msg', transaction_response.boleto_url)
								res.send('boleto')
							}else {
								res.cookie('msg', transaction_response.msg);
								res.send('Ok');
							}
						} else {
							res.cookie('error',transaction_response.msg);
							res.send('Not Ok')
						}
					});
				
				})
			}) 
		})
	})
});

router.get('/postOrder', function(req,res){
	var cookie = req.cookies.msg;
	if(req.query.data === "Not Ok"){
		cookie = req.cookies.error;
	}
	res.render('orderStatus', {msg: cookie, status: req.query.data});
})

router.get('/getSubscriptions',function(req,res){
   var credentials = JSON.parse(fs.readFileSync('./storage/env.json','utf8'));
   pagarme.client.connect({ api_key: credentials.api_key })
  .then(client => client.subscriptions.all())
  .then(subscriptions => {
  	res.render('listSubscriptions',{subscriptions: subscriptions})
  })
})

router.get('/getTransactions',function(req,res){
   var credentials = JSON.parse(fs.readFileSync('./storage/env.json','utf8'));
   pagarme.client.connect({ api_key: credentials.api_key })
  .then(client => client.transactions.all())
  .then(transactions => {
  	res.render('listTransactions',{transactions: transactions})
  })
})
module.exports = router
