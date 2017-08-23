const pagarme = require('pagarme');

pagarme.client.connect({ api_key: 'SUA API KEY' })
.then( client => {
  var cardCreationPromise, customerCreationPromise;

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
    }});

    Promise.all([ cardCreationPromise, customerCreationPromise ])
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
        card_id: card.id
      };

      client.transactions.create( payload )
      .then( transaction => {

        client.transactions.refund({ id: transaction.id })
        .then( refunded => console.log( refunded ), failure => console.log( failure ) )

      }, failure => console.log( failure ) );

    });

});
