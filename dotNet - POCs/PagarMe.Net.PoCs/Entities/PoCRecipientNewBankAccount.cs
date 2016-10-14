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
	public class PoCRecipientNewBankAccount : IPoC
	{
		Recipient model;

		public PoCRecipientNewBankAccount ()
		{
		}

		public String Title
		{ get { return "Criando um recebedor com uma conta bancária existente"; } }

		public void Create()
		{
			try
			{
				BankAccount BankAccount = new BankAccount()
				{
					BankCode = "184",
					Agencia = "0808",
					AgenciaDv = "8",
					Conta = "08808",
					ContaDv = "8",
					DocumentNumber = "43591017833",
					LegalName = "TesteTestadoTestando"
				};
				BankAccount.Save ();

				model = new Recipient()
				{
					BankAccount = BankAccount,
					TransferDay = 8,
					TransferEnabled = true,
					TransferInterval = TransferInterval.Monthly
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