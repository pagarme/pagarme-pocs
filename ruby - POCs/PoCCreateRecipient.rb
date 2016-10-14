require 'pagarme'

PagarMe.api_key = 'SUA_API'

r = PagarMe::Recipient.create(
    bank_account_id: '15728713',
    automatic_anticipation_enabled: false,
    transfer_interval: 'monthly', 
    transfer_day: '5',
    transfer_enabled: false
  )

puts r
