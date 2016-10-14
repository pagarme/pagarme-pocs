require 'pagarme'


class PoCCreateSubscription


def createSubscription()
	
	PagarMe.api_key = "SUA_API";

		subscription = PagarMe::Subscription.new({
		    #:plan => PagarMe::Plan.find_by_id("44359"),
		    :plan_id => "44359",
		    :card_id => "card_ciovkr3k602fi0d6e6kgyz17j",
		    :customer => { 
			    			name:  "John", 
			    			email: "john@gmail.com",
			    			document_number: "03221744307",
			    			address: {
			    					street: "The one",
			    					street_number: "23",
			    					neighborhood: "Harlem",
			    					city: "SAP",
			    					state: "SP",
			    					zipcode: "08461130"
			    			 } ,
			    			phone: {
			    			 	 	ddd: "11",
			    			 	 	number: "87631234"	
			    			  }

			    		 } 
		})

	subscription.create

end



end

if __FILE__ == $0

   tr = PoCCreateSubscription.new
   
   puts "-----------------------------"
   puts "-----------------------------"
   puts "-----------------------------"
   tr.createSubscription

end
