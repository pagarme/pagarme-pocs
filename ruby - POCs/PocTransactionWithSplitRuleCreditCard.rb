require 

class PocTransactionWithSplitRuleCreditCard

	def initialize(card_hash)

		@card_hash = card_hash
		
	end


    PagarMe.api_key = 
    transaction = PagarMe::Transaction.new({

       amount: 10000,
       card_hash: @card_hash,
       postback_url: "www.suapostbackurl",
       customer: {
				name: "John Smith",
				email: "john@smithassociates.com",
				document_number: "03221744307",
				address: {
					street: "The one on the corner",
					street_number: "34",
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
 

     })

    transaction.charge
	
end