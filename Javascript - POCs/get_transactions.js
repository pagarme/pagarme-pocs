const pagarme = require("pagarme");

pagarme.client.connect({ api_key: 'SUA API KEY' })
.then( client => client.transactions.all())
.then( transactions => console.log( transactions ), failure => console.log( failure ));
