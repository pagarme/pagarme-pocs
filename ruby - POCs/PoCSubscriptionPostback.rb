require 'pagarme'

PagarMe.api_key = 'SUA_API'

s = PagarMe::Subscription.new(
  plan:      PagarMe::Plan.find_by_id('52509'),
  payment_method: 'boleto',
  postback_url: 'http://requestb.in/14be8yd1',
  customer:  { email: 'customer_email@pagar.me' }
).create

sleep(4.5)
trs = PagarMe::Transaction.find_by subscription_id: s.id 
transaction = trs[0]

# puts transaction.status
transaction.status = 'paid'
transaction.save
# puts transaction
