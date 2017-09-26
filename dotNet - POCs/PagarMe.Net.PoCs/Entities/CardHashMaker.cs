using System;
using RestSharp;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Org.BouncyCastle.Crypto;
using System.Text;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Crypto.Engines;
using Org.BouncyCastle.Crypto.Encodings;
using Org.BouncyCastle.OpenSsl;


namespace PagarMeCSharpLibPoCs
{
    public class PoCCardHashManual
    {
        public PoCCardHashManual()
        {

        }
        public void getCardHash()
        {
            var client = new RestClient("https://api.pagar.me/1/");
            // client.Authenticator = new HttpBasicAuthenticator(username, password);

            var request = new RestRequest("/transactions/card_hash_key", Method.GET);
            request.AddParameter("encryption_key", "SUA ENCRYPTION KEY"); // adds to POST or URL querystring based on Method

            IRestResponse response = client.Execute(request);
            var content = response.Content;

            JObject json = JObject.Parse(content);

            var id = json["id"];
            var publicKey = json["public_key"];


            var args = new List<Tuple<string, string>>();

            args.Add(new Tuple<string, string>("card_number", "4242424242424242"));
            args.Add(new Tuple<string, string>("card_expiration_date", "1123"));
            args.Add(new Tuple<string, string>("card_holder_name", "Sharon"));
            args.Add(new Tuple<string, string>("card_cvv", "123"));

            var data = Encoding.UTF8.GetBytes(args.Select((t) => Uri.EscapeUriString(t.Item1) + "=" + Uri.EscapeUriString(t.Item2)).Aggregate((c, n) => c + "&" + n));


            using (var reader = new StringReader(publicKey.ToObject<String>()))
            {
                var pemReader = new PemReader(reader);
                var key = (AsymmetricKeyParameter)pemReader.ReadObject();
                var rsa = new Pkcs1Encoding(new RsaEngine());

                rsa.Init(true, key);

                Console.WriteLine(id + "_" + Convert.ToBase64String(rsa.ProcessBlock(data, 0, data.Length)));
            }

        }
    }
}