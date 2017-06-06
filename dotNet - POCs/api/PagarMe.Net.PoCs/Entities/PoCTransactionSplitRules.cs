using Newtonsoft.Json;
using System;
using System.Runtime;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using PagarMe;
using PagarMe.Base;
using PagarMePoCs.Net.Interfaces;

namespace PagarMePoCs.Net.Entities
{
    public class PoCTransactionSplitRules : IPoC
    {
        Transaction model;

        public PoCTransactionSplitRules()
        {
        }

        public String Title
        { get { return "Criar Transaction Split Rules"; } }

        public void Create()
        {
            try
            {
				Recipient Recipient = new Recipient()
				{
					BankAccount = PagarMeService.GetDefaultService ().BankAccounts.Find (14815682),
					TransferDay = 5,
					TransferEnabled = true,
					TransferInterval = TransferInterval.Weekly
				};
				Recipient.Save ();

                model = new Transaction()
                {
                    Amount = 3100,
                    PaymentMethod = PaymentMethod.CreditCard,
                    CardNumber = "4242424242424242",
					CardHolderName = "PagarMe",
                    CardExpirationDate = "0921",
                    CardCvv = "123",
                    Customer = new Customer()
                    {
						Name = "Teste PagarMe",
                        DocumentNumber = "43591017833",
                        DocumentType = DocumentType.Cpf,
                        Email = "teste@pagar.me",
                        Address = new Address()
                        {
                            Zipcode = "13223030",
                            Neighborhood = "Jardim Paulistano",
                            Street = "Av. Brigadeiro Faria Lima",
                            StreetNumber = "1811"
                        },
                        Phone = new Phone()
                        {
                            Ddd = "11",
                            Number = "12345678"
                        }
                    },
                    PostbackUrl = "",
                    SplitRules = new []
                    {
                        new SplitRule()
                        {
                            Recipient = Recipient,
                            ChargeProcessingFee = true,
                            Liable = true,
                            Percentage = 100
                        }
                    }
                };

                model.Save();
            }
            catch (PagarMeException ex)
            {
                throw ex;
            }
        }

        public Model GetModel()
        {
            return model;
        }
    }
}