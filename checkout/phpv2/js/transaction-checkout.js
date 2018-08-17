(function(document, window) {

  var button = document.querySelector('#transaction-button')

  // Abre o checkout ao clicar no botão "criar transação"
  button.addEventListener('click', function() {

    // inicia a instância do checkout
    var checkout = new PagarMeCheckout.Checkout({
      encryption_key: 'SUA_ENCRYPTION_KEY',
      /* success tratará o retorno do Pagar.me, 
       * neste caso ela receberá o token da transação, 
       * que deve ser utilizado para capturar a transação posteriormente */
      success: function(checkoutData) {
        /* $.ajax envia os dados gerados pelo checkout 
         * para o script capture-transaction.php
         */
        $.ajax({
          method: 'POST',
          url: 'php/capture-transaction.php',
          data: checkoutData,
          /* Este success irá fazer o tratamento de sucesso do script "capture-transaction.php" */
          success: function (transactionId) {
            createResponseDiv('success', 'Transação criada com sucesso: ' + transactionId)
          },
          /* error irá tratar os erros que forem recebidos do script "capture-transaction.php" */
          error: function (err) {
            var errorMessage = err.statusText + ': ' + err.responseText
            createResponseDiv('fail', errorMessage)
          }
        })
      },
      /* Esse error irá tratar os erros que ocorrerem ao tentar autorizar uma transação no pagar.me */
      error: function(err) {
        var pagarmeError = JSON.parse(err.responseText)
        var errors = JSON.stringify(pagarmeError.errors)
        errors = errors.replace('\\', ' ')
        errors = errors.replace(',', ', ')
        createResponseDiv('fail', 'Ocorreu um erro ao criar a transação:' + JSON.stringify(errors))
      },
      close: function() {
        console.log('The modal has been closed.')
      }
    })

    // Obs.: é necessário passar os valores boolean como string
    checkout.open({
      amount: 8000,
      buttonText: 'Pagar',
      buttonClass: 'button',
      customerData: 'true',
      createToken: 'true', // Define que será gerado um token
      paymentMethods: 'credit_card, boleto',
      /* Ao utilizar a versão 1.1.0 do checkout, é necessário enviar o parametro items,
       * os demais podem ser preenchidos pelo usuário no checkout, basta configurar o campo
       * customerData com o valor "true"
       */
      items: [
        {
          id: '1',
          title: 'Red Pill',
          unit_price: 8000,
          quantity: 1,
          tangible: true
        }
      ]
    })
  })

  /* Essa função é responsável por criar a Div e exibir o erro ao usuário */
  function createResponseDiv(elementClass, message) {
    var responseDiv = document.createElement('div')
    responseDiv.className = 'response ' + elementClass
    var responseMessage = document.createTextNode(message)
    responseDiv.appendChild(responseMessage)

    var body = document.querySelector('body')
    body.appendChild(responseDiv)

    removeElementAfterFiveSeconds(responseDiv)
  }

  function removeElementAfterFiveSeconds(element) {
    setTimeout(function() {
      element.parentNode.removeChild(element)
    }, 5000)
  }

})(document, window)
