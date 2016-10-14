require 'pagarme'

PagarMe.api_key = "SUA API KEY"
begin
card = PagarMe::Card.new({
    :card_number => '4242424242424242',
    :card_holder_name => 'Jose da Silva II',
    :card_expiration_month => '10',
    :card_expiration_year => '18',
    :card_cvv => '134'
})

card.create

if !card.valid
    raise 'Problema no cadastro do cartão'
end
creditcard.hash = card.id
rescue PagarMe::PagarValidationError => error
  ExceptionNotifier.notify_exception(error) 
  errors.add(:payment, "Houve um problema com a cobrança no cartão. Verifique se digitou todas as informações corretas e se o mesmo é MASTERCARD ou VISA")   

return card.valid  
end
