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
	public class PoCRecipientExistingBankAccount : IPoC
	{
		Recipient model;

		public PoCRecipientExistingBankAccount ()
		{
		}

		public String Title
		{ get { return "Criando um recebedor com uma conta bancária existente"; } }

		public void Create()
		{
			try
			{
				model = new Recipient()
				{
					BankAccount = PagarMeService.GetDefaultService ().BankAccounts.Find (14815682),
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