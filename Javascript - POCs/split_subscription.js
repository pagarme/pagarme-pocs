var pagarme = require("pagarme");

pagarme.client.connect({ api_key: 'SUA API KEY' })
.then( client => {

  var cardCreationPromise, customerCreationPromise,
  bankAccountCreationPromise_a, bankAccountCreationPromise_b,
  recipientCreationPromise_a, recipientCreationPromise_b,
  planCreationPromise;

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
  .then( bankAccounts => {

    const segunda_feira = 1;
    recipientCreationPromise_a = client.recipients.create({
      bank_account_id: bankAccounts[0].id,
      transfer_interval: 'weekly',
      transfer_day: segunda_feira,
      transfer_enabled: true
    });

    recipientCreationPromise_b = client.recipients.create({
      bank_account_id: bankAccounts[1].id,
      transfer_interval: 'weekly',
      transfer_day: segunda_feira,
      transfer_enabled: true
    });

    planCreationPromise = client.plans.create({
      amount: 1500,
      days: 30,
      trial_days: 0,
      payment_methods: "boleto, credit_card",
      invoice_reminder: 10,
      name: "Test Plan"
    });

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

    Promise.all([ cardCreationPromise, customerCreationPromise, planCreationPromise, recipientCreationPromise_a, recipientCreationPromise_b ])
    .then( values => {

      const card = values[0];

      var customer = values[1];
      customer.address = customer.addresses[0];
      customer.phone = customer.phones[0];

      const plan = values[2];
      const recipientA = values[3];
      const recipientB = values[4];

      var payload = {
        plan_id: plan.id,
        card_id: card.id,
        customer,
        split_rules: [
          {
            recipient_id: recipientB.id,
            charge_processing_fee: true,
            liable: true,
            percentage: 50
          },
          {
            recipient_id: recipientA.id,
            charge_processing_fee: false,
            liable: false,
            percentage: 50
          }
        ]
      };

      client.subscriptions.create(payload)
      .then( subscription => console.log( subscription ), failure => console.log( failure ) );

    });

  });

});
