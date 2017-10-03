<%-- 
    Document   : index
    Created on : 03/10/2017, 07:42:29
    Author     : jonatasmaxi
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title> Checkout</title>
    </head>
    <body>
        
        <form method="POST" action="FrontController">
            <script type="text/javascript"
                src="https://assets.pagar.me/checkout/checkout.js"
                data-button-text="Pagar"
                data-encryption-key="ek_test_93nbTN4oBKeYDqcun439rlQ4tbES83"
                data-amount="1000"
                data-customer-data="true"
                data-payment-methods="boleto,credit_card"
                data-ui-color="#bababa"
                data-postback-url="requestb.in/1234"
                data-create-token="false"
                data-interest-rate="12"
                data-free-installments="3"
                data-default-installment="1"
                data-header-text="Título">
            </script>
        </form>
    </body>
</html>
