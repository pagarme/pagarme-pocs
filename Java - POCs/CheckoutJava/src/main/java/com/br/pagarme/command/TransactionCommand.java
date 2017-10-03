/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.br.pagarme.command;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import me.pagar.model.Address;
import me.pagar.model.Customer;
import me.pagar.model.PagarMe;
import me.pagar.model.PagarMeException;
import me.pagar.model.Phone;
import me.pagar.model.Transaction;

/**
 *
 * @author jonatasmaxi
 */
public class TransactionCommand {

    private HttpServletRequest request;
    private HttpServletResponse response;
    private String returnPage;

    public TransactionCommand() {

    }

    public void init(HttpServletRequest request, HttpServletResponse response) {
        this.request = request;
        this.response = response;
    }

    public void run() {
        PagarMe.init("SUA_CHAVE_DE_API");
        if (request.getParameter("token") != null) {

            try {
                Transaction tx = new Transaction().find(request.getParameter("token"));
                System.out.println(tx);
                tx.capture(tx.getAmount());
                request.setAttribute("transaction", tx);
                returnPage = "transaction.jsp";

            } catch (PagarMeException ex) {
                Logger.getLogger(TransactionCommand.class.getName()).log(Level.SEVERE, null, ex);
            }

        } else if (request.getParameter("pagarme[card_hash]") != null) {
            String cardHash = request.getParameter("pagarme[card_hash]");
            String amount = request.getParameter("pagarme[amount]");
            Transaction tx = new Transaction();
            Customer cr = new Customer();
            cr.setName(request.getParameter("pagarme[customer][name]"));
            cr.setEmail(request.getParameter("pagarme[customer][email]"));
            cr.setDocumentNumber(request.getParameter("pagarme[customer][document_number]"));
            Phone phone = new Phone();
            phone.setDdd(request.getParameter("pagarme[customer][phone][ddd]"));
            phone.setNumber(request.getParameter("pagarme[customer][phone][number]"));
            cr.setPhone(phone);
            tx.setAmount(Integer.parseInt(amount));
            tx.setCardHash(cardHash);
            Address address = new Address();
            address.setZipcode(request.getParameter("pagarme[customer][address][zipcode]"));
            address.setStreet(request.getParameter("pagarme[customer][address][street]"));
            address.setStreetNumber(request.getParameter("pagarme[customer][address][street_number]"));
            address.setComplementary(request.getParameter("pagarme[customer][address][complementary]"));
            address.setNeighborhood(request.getParameter("pagarme[customer][address][neighborhood]"));
            address.setCity(request.getParameter("pagarme[customer][address][city]"));
            address.setState(request.getParameter("pagarme[customer][address][state]"));
            cr.setAddress(address);
            tx.setCustomer(cr);
            try {
                tx.save();
            } catch (PagarMeException ex) {
                Logger.getLogger(TransactionCommand.class.getName()).log(Level.SEVERE, null, ex);
            }
            request.setAttribute("transaction", tx);
            returnPage = "transaction.jsp";
        }

    }

    public String getReturnPage() {

        return returnPage;
    }

}
