require 'pagarme'

PagarMe.api_key = 'SUA API KEY'

r =  PagarMe::Recipient.create(
    bank_account: {
      bank_code:       '237',
      agencia:         '1935',
      agencia_dv:      '9',
      conta:           '23398',
      conta_dv:        '9',
      legal_name:      'Fulano da Silva',
      document_number: '00000000000000' # CPF or CNPJ
    },
    transfer_enabled: false,
    automatic_anticipation_enabled: false,
    transfer_interval: 'monthly',
    transfer_day: '5'
  )


r2 =  PagarMe::Recipient.create(
    bank_account: {
      bank_code:       '232',
      agencia:         '1435',
      agencia_dv:      '6',
      conta:           '25498',
      conta_dv:        '1',
      legal_name:      'Fulano da Silva II',
      document_number: '70671089269' # CPF or CNPJ
    },
    transfer_enabled: false,
    automatic_anticipation_enabled: false,
    transfer_interval: 'monthly',
    transfer_day: '5'
  )

t = PagarMe::Transaction.create(
    amount: 10000,
    payment_method: 'boleto',
    split_rules: [
        {
          recipient_id: r.id,
          percentage: 10,
          liable: true,
          charge_processing_fee: true
        } ,
        {
          recipient_id: r2.id,
          percentage: 90,
          liable: true,
          charge_processing_fee: true
        } 
    ]
)

puts t
