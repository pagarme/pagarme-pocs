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
	public class PoCSubscription : IPoC
	{
		Subscription model;

		public PoCSubscription ()
		{
		}

		public String Title
		{ get { return "Criar Subscription"; } }

		public void Create()
		{
			try
			{
				model = new Subscription()
				{
					PaymentMethod = PaymentMethod.CreditCard,
					Plan = PagarMeService.GetDefaultService ().Plans.Find (46108),
					Card = PagarMeService.GetDefaultService ().Cards.Find ("card_ciqice60200c8lb6dd033ju2c"),
					PostbackUrl = "",
					Customer = new Customer()
					{
						Name = "Teste PagarMe",
						DocumentNumber = "12203395559",
						DocumentType = DocumentType.Cpf,
						Email = "alexandre.souza@pagar.me",
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
					}
				};
				model.Metadata["Teste1"] = "Metadata de testes 1";
				model.Metadata["Teste2"] = "Metadata de testes 2";
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