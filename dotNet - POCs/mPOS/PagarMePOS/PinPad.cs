using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Configuration;
using System.IO.Ports;
using PagarMe.Mpos;
using PagarMe;

namespace PagarMePOS
{
    class PinPad : POSConfig
    {
        private readonly SerialPort port;
        private readonly Mpos mpos;

        public PinPad()
        {
            port = new SerialPort(device, 140000, Parity.None, 8, StopBits.One);
            port.Open();

            mpos = new Mpos(port.BaseStream, encryptionKey, AppDomain.CurrentDomain.BaseDirectory.ToString());
            mpos.Initialized += (sender, e) => mpos.Display(welcomeMessage);
            mpos.NotificationReceived += (sender, e) => Console.WriteLine("Status: {0}", e);
            mpos.TableUpdated += (sender, e) =>
            {
                Console.WriteLine("LOADED: {0}", e);
                mpos.Display(welcomeMessage);
            };
            mpos.PaymentProcessed += (sender, e) => Console.WriteLine("HEY CARD HASH " + e.CardHash);
            mpos.FinishedTransaction += (sender, e) => Console.WriteLine("FINISHED TRANSACTION!");
            mpos.OperationCompleted += (sender, e) => Console.WriteLine("OPERATION COMPLETED: {0}", e);
            mpos.Errored += (sender, e) =>
            {
                Console.WriteLine("ERROR: {0} - {1}", e, new Status(e).description);
                mpos.Display(new Status(e).message);
            };

            PagarMeService.DefaultApiEndpoint = baseURL;
            PagarMeService.DefaultEncryptionKey = encryptionKey;
            PagarMeService.DefaultApiKey = apiKey;
        }

        public List<EmvApplication> Brands()
        {
            List<EmvApplication> applications = new List<EmvApplication>();

            //configura bandeiras de crédito
            foreach (BrandCredit brand in creditBrands)
            {
                applications.Add(new EmvApplication(brand.ToString(), PagarMe.Mpos.PaymentMethod.Credit));
            }

            //configura bandeiras de débito
            foreach (BrandDebit brand in debitBrands)
            {
                applications.Add(new EmvApplication(brand.ToString(), PagarMe.Mpos.PaymentMethod.Debit));
            }

            return (applications.Count() == 0) ? null : applications;
        }

        public void MsgDisplay(string message)
        {
            mpos.Display(message);
        }

        public async Task Card()
        {
            var result = await mpos.ProcessPayment(100, Brands(), PagarMe.Mpos.PaymentMethod.Debit);
            Card card = new Card();
            card.CardHash = result.CardHash;
            await card.SaveAsync();
            Console.WriteLine(card.Id);
            await mpos.Close();
        }

        public async Task Pay(int amount)
        {
            var result = await mpos.ProcessPayment(amount, Brands(), PagarMe.Mpos.PaymentMethod.Debit);
            Console.WriteLine("CARD HASH: " + result.CardHash);

            var transaction = new Transaction
            {
                CardHash = result.CardHash,
                Amount = amount,
                ShouldCapture = false
            };

            await transaction.SaveAsync();

            Console.WriteLine("Transaction ARC = " + transaction.AcquirerResponseCode + ", Id = " + transaction.Id);
            Console.WriteLine("ACQUIRER RESPONSE CODE = " + transaction.AcquirerResponseCode);
            Console.WriteLine("EMV RESPONSE = " + transaction["card_emv_response"]);

            int x = Int32.Parse(transaction.AcquirerResponseCode);
            object obj = transaction["card_emv_response"];
            string response = obj == null ? null : obj.ToString();
            Console.WriteLine(response);

            await mpos.FinishTransaction(true, x, (string)obj);
            await mpos.Close();
        }

        public async Task Initialize()
        {
            await mpos.Initialize();
            Console.WriteLine("Asking for tables to be synchronized...");
            await mpos.SynchronizeTables(true);
            Console.WriteLine("SynchronizeTables called.");
        }

        public async Task Terminate()
        {
            Console.WriteLine("Closing mpos...");
            //await mpos.Close();
            port.Close();
        }

    }
}
