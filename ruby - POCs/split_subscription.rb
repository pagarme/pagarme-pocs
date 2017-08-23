require "pagarme"

PagarMe.api_key = "SUA API KEY"

plan = PagarMe::Plan.new({
  :name => "PLANO TESTE RUBY",
  :days => 30,
  :amount => 1500,
  :trial_days => 0,
  :payment_methods => [ "credit_card" ]
}).create

bankAccountA = PagarMe::BankAccount.new({
  :bank_code => "237",
  :agencia => "1935",
  :agencia_dv => "9",
  :conta => "23398",
  :conta_dv => "9",
  :legal_name => "CONTA BANCARIA TESTE A",
  :document_number => "61490743073"
}).create

bankAccountB = PagarMe::BankAccount.new({
  :bank_code => "458",
  :agencia => "3158",
  :agencia_dv => "8",
  :conta => "45291",
  :conta_dv => "8",
  :legal_name => "CONTA BANCARIA TESTE B",
  :document_number => "46676438038"
}).create

recipientA = PagarMe::Recipient.new({
  :anticipatable_volume_percentage => 80,
  :automatic_anticipation_enabled => true,
  :bank_account_id => bankAccountA.id,
  :transfer_day => "1",
  :transfer_enabled => true,
  :transfer_interval => "weekly"
}).create

recipientB = PagarMe::Recipient.new({
  :anticipatable_volume_percentage => 50,
  :automatic_anticipation_enabled => true,
  :bank_account_id => bankAccountB.id,
  :transfer_day => "5",
  :transfer_enabled => true,
  :transfer_interval => "weekly"
}).create

splitRules = [
  {
    recipient_id: recipientA.id,
    liable: true,
    charge_processing_fee: true,
    percentage: 50
  },
  {
    recipient_id: recipientB.id,
    liable: true,
    charge_processing_fee: false,
    percentage: 50
  }
]

customer = PagarMe::Customer.new({
    :document_number => "18152564000105",
    :name => "Cliente Teste Ruby",
    :email => "cliente@ruby.com",
    :born_at => 13091988,
    :gender => "M",
    :address => {
        :street => "rua qualquer",
        :complementary => "apto",
        :street_number => 13,
        :neighborhood => "pinheiros",
        :city => "sao paulo",
        :state => "SP",
        :zipcode => "05444040",
        :country => "Brasil"
    },
    :phone => {
        :ddi => 55,
        :ddd => 11,
        :number => "9999-9999"
    }
}).create

customer.address = customer.addresses[0]
customer.phone = customer.phones[0]

card = PagarMe::Card.new({
	:card_number => "4111111111111111",
  :card_holder_name => "Cliente Teste Ruby",
	:card_expiration_month => "11",
	:card_expiration_year => "23",
	:card_cvv => "123"
}).create


subscription = PagarMe::Subscription.new({
  :plan => plan,
  :payment_method => "credit_card",
  :card_number => "4111111111111111",
  :card_holder_name => "Cliente Teste Ruby",
  :card_expiration_month => "11",
  :card_expiration_year => "23",
  :card_cvv => "123",
  :customer => customer,
  :split_rules => splitRules
}).create

print subscription
