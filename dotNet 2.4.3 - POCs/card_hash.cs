using System;
using PagarMe;

namespace sandbox
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			var service = new PagarMeService("API_KEY", "ENCRYPTION_KEY"); 

			CardHash card_hash = new CardHash(service);
			card_hash.CardHolderName = "Customer Teste";
			card_hash.CardNumber = "4111111111111111";
			card_hash.CardExpirationDate = "1122";
			card_hash.CardCvv = "123";

			try {
				String hash = card_hash.Generate();
				Console.WriteLine(hash);
			} catch( Exception e ) {
				Console.WriteLine (e.Message);
			}
		}
	}
}
