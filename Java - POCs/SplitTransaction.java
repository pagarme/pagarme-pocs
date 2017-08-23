import java.util.ArrayList;
import java.util.List;

import org.joda.time.LocalDate;

import me.pagar.model.Address;
import me.pagar.model.BankAccount;
import me.pagar.model.BankAccount.DocumentType;
import me.pagar.model.Card;
import me.pagar.model.Customer;
import me.pagar.model.PagarMe;
import me.pagar.model.PagarMeException;
import me.pagar.model.Phone;
import me.pagar.model.Recipient;
import me.pagar.model.Recipient.TransferInterval;
import me.pagar.model.Transaction.PaymentMethod;
import me.pagar.model.SplitRule;
import me.pagar.model.Transaction;

public class SplitTransaction {

	public static void main(String [] args) {
		final String apiKey = "SUA API KEY";

		PagarMe.init(apiKey);

		try {

			BankAccount bankA = new BankAccount();
			bankA.setAgencia("9999");
			bankA.setAgenciaDv("9");
			bankA.setBankCode("341");
			bankA.setConta("99999");
			bankA.setContaDv("9");
			bankA.setLegalName("Banco Teste A");
			bankA.setDocumentType( DocumentType.CPF );
			bankA.setDocumentNumber("67169305070");
			bankA.save();

			BankAccount bankB = new BankAccount();
			bankB.setAgencia("8888");
			bankB.setAgenciaDv("8");
			bankB.setBankCode("341");
			bankB.setConta("88888");
			bankB.setContaDv("8");
			bankB.setLegalName("Banco Teste B");
			bankB.setDocumentType( DocumentType.CPF );
			bankB.setDocumentNumber("31302465090");
			bankB.save();

			Recipient recipientA = new Recipient();
			recipientA.setBankAccount( bankA );
			recipientA.save();

			Recipient recipientB = new Recipient();
			recipientB.setBankAccount( bankB );
			recipientB.save();

			SplitRule splitA = new SplitRule();
			splitA.setPercentage(50);
			splitA.setChargeProcessingFee(true);
			splitA.setLiable(true);
			splitA.setRecipientId( recipientA.getId() );

			SplitRule splitB = new SplitRule();
			splitB.setPercentage(50);
			splitB.setChargeProcessingFee(true);
			splitB.setLiable(true);
			splitB.setRecipientId( recipientB.getId() );

			List<SplitRule> splitRules = new ArrayList<>();
			splitRules.add( splitA );
			splitRules.add( splitB );

			Address address = new Address("Rua Monsenhor Alfredo de Arruda Câmara", "1141", "Tatuquara", "81480245");
			address.setComplementary("Casa");

			Customer customer = new Customer();
			customer.setName("Customer Teste");
			customer.setEmail("customer.teste@java.com");
			customer.setGender("F");
			customer.setBornAt( new LocalDate(1996, 07, 17) );
			customer.setDocumentNumber("33329949058");
			customer.setPhone( new Phone("11", "9999-9999") );
			customer.setAddress( address );
			customer.save();

			Card card = new Card();
			card.setCustomerId( customer.getId() );
			card.setHolderName("Customer Teste Java");
			card.setNumber("4111111111111111");
			card.setCvv(123);
			card.setExpiresAt("1123");
			card.save();

			Transaction transaction = new Transaction();
			transaction.setAmount(10000);
			transaction.setPaymentMethod( PaymentMethod.CREDIT_CARD );
			transaction.setCardId( card.getId() );
			transaction.setCustomer( customer );
			transaction.setSplitRules(splitRules);
			transaction = transaction.save();

			System.out.println( transaction );

		} catch( PagarMeException e ) {
			System.out.println( e );
		}
	}

}
