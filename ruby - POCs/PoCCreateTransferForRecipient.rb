require 'pagarme'

PagarMe.api_key = 'SUA_API'

t = PagarMe::Transfer.new(
      amount: '10000',
      recipient_id: 're_cimcpc2qc002za46d9dt4vfok'
).create

puts t
