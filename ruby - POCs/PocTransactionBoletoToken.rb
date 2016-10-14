require 'pagarme'

class PocTransactionBoletoToken

	def initialize(token)

		@token = token
		
	end
	

    def createTransaction()
    
        PagarMe.api_key = "SUA_API"
        transaction = PagarMe::Transaction.find_by_id(token)
        
        #Lembre-se que o amount deve vir sempre do seu server
        transaction.amount = 10000

        transaction.capture
     

    	
    end


end
