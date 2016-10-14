require 'pagarme'

PagarMe.api_key = 'SUA_API'

params = {'recipient_id' => 're_cirrp4k7e0101rd6e5tvz7o7r', 'transaction_id' => '622960' } 

p = PagarMe::Payable.find_by params 

# puts p


params = {'status' => 'paid', 'count' => '50'}
s = PagarMe::Subscription.find_by status: 'paid'

puts s.length
puts '============================================================================================================'

s2 = PagarMe::Subscription.find_by status: 'canceled'

puts s2.length


