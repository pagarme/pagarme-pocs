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
	public class PoCTransactionCreditCard : IPoC
	{
		Transaction model;

		public PoCTransactionCreditCard ()
		{
		}

		public String Title
        { get { return "Criar Transaction Credit Card"; } }

		public void Create ()
		{
			try {
				model = new Transaction () {
					Amount = 3100,
					PaymentMethod = PaymentMethod.CreditCard,
					CardNumber = "4242424242424242",
					CardHolderName = "Teste PagarMe",
					CardExpirationDate = "0921",
					CardCvv = "123",
					Customer = new Customer () {
						Name = "Teste PagarMe",
						DocumentNumber = "43591017833",
						DocumentType = DocumentType.Cpf,
						Email = "teste@pagar.me",
						Address = new Address () {
							Zipcode = "13223030",
							Neighborhood = "Jardim Paulistano",
							Street = "Av. Brigadeiro Faria Lima",
							StreetNumber = "1811"
						},
						Phone = new Phone () {
							Ddd = "11",
							Number = "12345678"
						}
					},
					PostbackUrl = "http://www.aledsz.com.br/validateRequest.php",
					Metadata = new AbstractModel (PagarMeService.GetDefaultService ()) {
						["idProduto" ] = "13933139"
					}
				};

				model.Save ();
			} catch (PagarMeException ex) {
				throw ex;
			}
		}

		public Model GetModel ()
		{
			return model;
		}
	}
}