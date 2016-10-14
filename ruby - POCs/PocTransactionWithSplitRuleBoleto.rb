require 'pagarme'

class PocTransactionWithSplitRuleBoleto

	def createTransaction()

		PagarMe.api_key = "SUA_API"
		transaction  = PagarMe::Transaction.new({

         amount: 10000,
         payment_method: "boleto",
         postback_url: "www.importantesaberquandoboletopago.com",
         split_rules: [
         	{
         		recipient_id: "ID HERE",
         		percentage: 50
         	},
         	{
         		recipient_id: "ID HERE",
         		percentage: 50
         	}

         ]
        }).charge

        
        puts transaction.status


		
	end
	
end
