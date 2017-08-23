package com.mycompany.pocjava;

import me.pagar.model.Address;
import me.pagar.model.Card;
import me.pagar.model.Customer;
import me.pagar.model.PagarMe;
import me.pagar.model.PagarMeException;
import me.pagar.model.Phone;
import me.pagar.model.Plan;
import me.pagar.model.Subscription;

public class Subscription {

    public static void main(String[] args) {
        String apiKey = "SUA API KEY";

        PagarMe.init( apiKey );

        Address address = new Address("Estrada Servidão", "1742", "Haras Paineiras", "13324320");
        Phone phone = new Phone("11", "9999-9999");

        try {

            Customer customer = new Customer("Cliente Teste Java", "cliente@java.com");
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

            final int amount = 1500;
            Plan plan = new Plan();
            plan.setName("PLANO TESTE JAVA");
            plan.setAmount( amount );
            plan.setCharges( 6 );
            plan.setInstallments( 12 );
            plan.setDays( 30 );
            plan.setTrialDays( 0 );
            plan.save();

            Subscription subscription = new Subscription();
            subscription.setCreditCardSubscriptionWithCardId(plan.getId(), creditCard.getId(), customer);
            subscription.save();

            System.out.println( subscription );

        } catch( PagarMeException e ) {
            System.out.println( e );
        }

    }

}
