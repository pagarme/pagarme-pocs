require 'pagarme'

class PocTransactionBoleto


    def createTransaction()
    
        PagarMe.api_key = "SUA_API"
        transaction = PagarMe::Transaction.new({

            amount: 10000,
            payment_method: "boleto", 
            postback_url: "www.importantesaberquandoboletofoipago.com",
              

         })
        
        transaction.charge
        #Vamos verificar a url de boleto gerada
        puts transaction.boleto_url


    
    end


end
