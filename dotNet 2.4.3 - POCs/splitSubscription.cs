using System;
using PagarMe;

namespace pagarmepoc
{
  class MainClass
  {
    public static void Main(string[] args)
    {
      PagarMeService.DefaultApiKey = "SUA API KEY";

      PaymentMethod[] paymentMethods = new PaymentMethod[1];
      paymentMethods[0] = PaymentMethod.CreditCard;

      Plan plan = new Plan()
      {
      	Name = "PLANO TESTE DOTNET",
      	Amount = 1500,
      	Days = 30,
      	PaymentMethods = paymentMethods
      };
      plan.Save();

      BankAccount bankAccountA = new BankAccount()
      {
      	Agencia = "99",
      	AgenciaDv = "9",
      	BankCode = "999",
      	Conta = "99999",
      	ContaDv = "9",
      	DocumentType = DocumentType.Cpf,
      	DocumentNumber = "18323410038",
      	LegalName = "CONTA BANCARIA TESTE A"
      };
      bankAccountA.Save();

      BankAccount bankAccountB = new BankAccount()
      {
      	Agencia = "8888",
      	AgenciaDv = "8",
      	BankCode = "888",
      	Conta = "88888",
      	ContaDv = "8",
      	DocumentType = DocumentType.Cpf,
      	DocumentNumber = "98341992019",
      	LegalName = "CONTA BANCARIA TESTE B"
      };
      bankAccountB.Save();

      Recipient recipientA = new Recipient()
      {
      	TransferInterval = TransferInterval.Daily,
      	BankAccount = bankAccountA
      };
      recipientA.Save();

      Recipient recipientB = new Recipient()
      {
      	TransferInterval = TransferInterval.Daily,
      	BankAccount = bankAccountB
      };
      recipientB.Save();

      Address address = new Address()
      {
      	State = "Sao Paulo",
      	City = "Americana",
      	Neighborhood = "Sao Luiz",
      	Street = "Rua Luiz Cia",
      	Zipcode = "13477640",
      	StreetNumber = "372"
      };

      Phone phone = new Phone()
      {
      	Ddd = "11",
      	Number = "9999-9999"
      };

      Customer customer = new Customer()
      {
      	Name = "Samuel Castro Souza",
      	Address = address,
      	Phone = phone,
      	DocumentType = DocumentType.Cpf,
      	DocumentNumber = "67216630742",
      	Gender = Gender.Male,
      	BornAt = new DateTime(1996, 07, 17),
      	Email = "SamuelCastroSouza@teleworm.us"
      };
      customer.Save();

      customer.Address = customer.Addresses[0];
      customer.Phone = customer.Phones[0];

      Card creditCard = new Card()
      {
      	Number = "4111111111111111",
      	Cvv = "123",
      	HolderName = "Samuel Castro Souza",
      	ExpirationDate = "1123",
      	Customer = customer
      };
      creditCard.Save();

      SplitRule splitA = new SplitRule()
      {
      	Amount = 5000,
      	Liable = true,
      	ChargeProcessingFee = true,
      	Recipient = recipientA
      };

      SplitRule splitB = new SplitRule()
      {
      	Amount = 5000,
      	Liable = true,
      	ChargeProcessingFee = true,
      	Recipient = recipientB
      };

      SplitRule[] splitRules = new SplitRule[2];
      splitRules[0] = splitA;
      splitRules[1] = splitB;

      Subscription subscription = new Subscription()
      {
      	Plan = plan,
      	Customer = customer,
      	Card = creditCard,
      	PaymentMethod = PaymentMethod.CreditCard,
      };
      subscription.Save();

      Console.Write(subscription.Status);
    }
  }
}
