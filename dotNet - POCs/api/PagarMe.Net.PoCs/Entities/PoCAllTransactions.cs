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
	public class PoCAllTransactions : IPoC
	{
		Transaction model;

		public PoCAllTransactions ()
		{
		}

		public String Title
		{ get { return "Obter Todas Transactions"; } }

		public void Create()
		{
			try
			{
				model = new Transaction();
				IEnumerable<Transaction> trxs = PagarMeService.GetDefaultService().Transactions.FindAll(model);
				trxs = trxs.Skip(0).Take(10);
				model = trxs.FirstOrDefault();
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