# Introdução

Esta pasta contém exemplos de como integrar com o Checkout Pagar.me. Nele são abordados os seguintes pontos:

1. Criação de autorização de uma transação.
2. Criação de assinatura com o Checkout Pagar.me.

# Configurando o projeto.

Para que o projeto funcione, você deve inserir sua chave de criptografia nos arquivos `js/subscription-checkout.js` e `js/transaction-checkout.js`.

Não se esqueça de configurar suas chaves de api nos arquivos `php/create-subscription` e `php/capture-transaction`

# Executando

Para executar esse projeto, siga as instruções abaixo:

1. Baixe o repositório utilizando um dos métodos abaixo:

`git clone git@github.com:pagarme/pagarme-pocs.git`

ou

`git clone https://github.com/pagarme/pagarme-pocs.git`

ou pelo link:

https://github.com/pagarme/pagarme-pocs/archive/master.zip


2. Acesse pasta que foi baixada, e acesse o caminho `checkout/phpv2`.

3. Abra o terminal e digite o comando php -S localhost:8079.

Você também pode utilizar o xampp/wampp para executar esse projeto, basta jogar essa pasta para o caminho `www` de seu servidor.

4. Abra seu navegador, e digite `localhost:8079` onde o link é digitado.