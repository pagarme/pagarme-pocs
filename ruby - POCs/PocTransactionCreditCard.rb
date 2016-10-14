require 'pagarme'

class PocTransactionCreditCard


    def initialize()
    		@card_hash = "card_hash recebido no callback de sucesso Checkout ou lib"
	end


	def createTransaction()

		PagarMe.api_key = "SUA_API"
		transaction  = PagarMe::Transaction.new({

         amount: 10000,
         installments: 12,
         payment_method: "boleto",
         # card_hash: @card_hash,
         postback_url: "http://requestb.in/10taynn1",
         customer: {
           name: "John Smith",
           email: "john@smithassociates.com",
           document_number: "03221744307",
           address: {
             street: "The one on the corner",
             street_number: "034",
             neighborhood: "Suburb",
             city: "Sunderland",
             state: "Sundy",
             zipcode: "09720200"
           },
           phone: {
             ddd: "11",
             number: "15514567"
           }
         },
         metadata: {
           invoice: String.new("01625342001470189905")
         }

    })

            
			puts "------------AFTER CHARGE-------------------"
			transaction.charge
			puts transaction.status
			transaction.status = "paid"
      transaction.save 
      puts transaction.status 
	end 
end


if __FILE__ == $0

   tr = PocTransactionCreditCard.new
   
   tr.createTransaction

end


