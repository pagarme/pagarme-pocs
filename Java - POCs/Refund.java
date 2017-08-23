package com.mycompany.pocjava;

import me.pagar.model.Address;
import me.pagar.model.Card;
import me.pagar.model.Customer;
import me.pagar.model.PagarMe;
import me.pagar.model.PagarMeException;
import me.pagar.model.Phone;
import me.pagar.model.Transaction;

public class Refund {

    public static void main(String[] args) {
        final String apiKey = "SUA API KEY";

        PagarMe.init( apiKey );

        Address address = new Address("Estrada Servidão", "1742", "Haras Paineiras", "13324320");
        Phone phone = new Phone("11", "9999-9999");

        try {

            Customer customer = new Customer("Cliente Teste Java", "teste@java.com");
            customer.setDocumentNumber("43506259091");
            customer.setAddress( address );
            customer.setPhone( phone );
            customer.save();

            Card creditCard = new Card();
            creditCard.setCustomerId( customer.getId() );
            creditCard.setHolderName("Cliente Teste Java");
            creditCard.setNumber("4111111111111111");
            creditCard.setCvv(123);
            creditCard.setExpiresAt("1123");
            creditCard.save();

            final int amount = 10000;
            Transaction transaction = new Transaction();
            transaction.setAmount( amount );
            transaction.setCardId( creditCard.getId() );
            transaction.setCustomer( customer );
            transaction.save();

            transaction = transaction.refund( amount );

            System.out.println( transaction );

        } catch( PagarMeException e ) {
            System.out.println( e );
        }
    }

}
