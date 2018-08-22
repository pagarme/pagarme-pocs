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

