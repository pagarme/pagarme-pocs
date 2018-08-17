(function(document, window) {

  var button = document.querySelector('#subscription-button')

  // Abre o checkout ao clicar no botão "criar assinatura"
  button.addEventListener('click', function() {

    // inicia a instância do checkout
    var checkout = new PagarMeCheckout.Checkout({
      encryption_key: 'SUA_ENCRYPTION_KEY',
      /* Essa função success tratará o retorno do Pagar.me, 
       * neste caso ela receberá os dados inseridos no checkout,
       * que devem ser utilizados para criar a assinatura posteriormente.
       * Dados retornados: card_hash, installments, amount, payment_method e customer
       */
      success: function(checkoutData) {
      /* $.ajax envia os dados gerados pelo checkout
       * para o script create-subscription
       */
        $.ajax({
          method: 'POST',
          url: 'php/create-subscription.php',
          data: checkoutData,
          /* success irá fazer o tratamento de sucesso do 
          * script "create-subscription.php" */
          success: function (subscriptionId) {
            createResponseDiv('success', 'Assinatura criada com sucesso: ' + subscriptionId)
          },
          /* error irá tratar os erros que forem recebidos do script "create-subscription.php" */
          error: function (err) {
            var errorMessage = err.statusText + ': ' + err.responseText
            createResponseDiv('fail', errorMessage)
          }
        })
      },
      /* Esse error irá tratar os erros que ocorrerem ao tentar gerar os dados do customer */
      error: function(err) {
        var pagarmeError = JSON.parse(err.responseText)
        var errors = JSON.stringify(pagarmeError.errors)
        errors = errors.replace('\\', ' ')
        errors = errors.replace(',', ', ')
        createResponseDiv('fail', 'Ocorreu um erro ao criar a criar a assinatura:' + JSON.stringify(errors))
      },
      close: function() {
        console.log('The modal has been closed.')
      }
    })

    // Obs.: é necessário passar os valores boolean como string
    checkout.open({
      amount: 2000,
      buttonText: 'Pagar',
      buttonClass: 'button',
      customerData: 'true',
      /* 
       * createToken define se será gerada uma transação (true), ou se serão apenas
       * coletados os dados do customer pelo checkout (false). Para utilizar o checkout
       * na criação de assinaturas, é necessário especificar esse valor como false
       */
      createToken: 'false',
      paymentMethods: 'credit_card, boleto',
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
