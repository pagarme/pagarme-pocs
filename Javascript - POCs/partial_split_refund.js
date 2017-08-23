const pagarme = require('pagarme');

pagarme.client.connect({ api_key: 'SUA API KEY' })
.then( client => {
  var cardCreationPromise, customerCreationPromise, bankAccountCreationPromise_a, bankAccountCreationPromise_b;

  cardCreationPromise = client.cards.create({
    card_number: '4018720572598048',
    card_holder_name: 'Aardvark Silva',
    card_expiration_date: '1132',
    card_cvv: '123'
  });

  customerCreationPromise = client.customers.create({
    document_number: '18152564000105',
    name: 'Customer Teste',
    email: 'customer@email.com',
    born_at: 17071996,
    gender: 'M',
    address: {
      street: 'Rua Fidêncio Ramos',
      complementary: 'apto',
      street_number: 308,
      neighborhood: 'pinheiros',
      city: 'São Paulo',
      state: 'SP',
      zipcode: '04551010',
      country: 'Brasil'
    },
    phone: {
      ddd: 11,
      number: 999887766
    }
  });

  bankAccountCreationPromise_a = client.bankAccounts.create({
    bank_code: '237',
    agencia: '9999',
    agencia_dv: '9',
    conta: '99999',
    conta_dv: '9',
    legal_name: 'TEST BANK ACCOUNT A',
    document_number: '74454355738'
  });

  bankAccountCreationPromise_b = client.bankAccounts.create({
    bank_code: '237',
    agencia: '9999',
    agencia_dv: '9',
    conta: '77777',
    conta_dv: '7',
    legal_name: 'TEST BANK ACCOUNT B',
    document_number: '75334672800'
  });

  Promise.all([ bankAccountCreationPromise_a, bankAccountCreationPromise_b ])
  .then( function( values ) {

    var bankAccountA, bankAccountB, recipientCreationPromise_a, recipientCreationPromise_b;

    bankAccountA = values[0];
    bankAccountB = values[1];

    const segunda_feira = 1;
    recipientCreationPromise_a = client.recipients.create({
      bank_account_id: bankAccountA.id,
      transfer_interval: 'weekly',
      transfer_day: segunda_feira,
      transfer_enabled: true
    });

    recipientCreationPromise_b = client.recipients.create({
      bank_account_id: bankAccountB.id,
      transfer_interval: 'weekly',
      transfer_day: segunda_feira,
      transfer_enabled: true
    });

    Promise.all([ cardCreationPromise, customerCreationPromise, recipientCreationPromise_a, recipientCreationPromise_b ])
    .then( values => {

      var card, customer, payload;

      card = values[0];
      customer = values[1];

      customer.address = customer.addresses[0];
      customer.phone = customer.phones[0];

      payload = {
        amount: 10000,
        payment_method: "credit_card",
        customer: customer,
        card_id: card.id,
        split_rules: [
          {
            recipient_id: values[2].id,
            liable: true,
            charge_processing_fee: true,
            percentage: 50
          },
          {
            recipient_id: values[3].id,
            liable: true,
            charge_processing_fee: true,
            percentage: 50
          }
        ]
      };

      client.transactions.create( payload )
      .then( transaction => {

        var refundPayload = {
          id: transaction.id,
          amount: 5000,
          split_rules: [
            {
              id: transaction.split_rules[0].id,
              recipient_id: values[2].id,
              charge_processing_fee: true,
              percentage: 50
            },
            {
              id: transaction.split_rules[1].id,
              recipient_id: values[3].id,
              percentage: 50
            }
          ]
        };

        client.transactions.refund( refundPayload )
        .then( refunded => console.log(refunded), failure => console.log(JSON.stringify(failure)));

      }, failure => console.log( failure ) );

    }, failure => console.log( failure ) );

  }, failure => console.log( failure ) );

});
