using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PagarMePOS
{
    class POSConfig
    {
        /// <summary>
        /// Retorna porta de comunicação do pinpad
        /// </summary>
        protected string device
        {
            get
            {
                return ConfigurationSettings.AppSettings["PinPadDevice"].ToString();
            }
        }

        /// <summary>
        /// Retorna a URL base da API da PagarMe
        /// </summary>
        protected string baseURL
        {
            get
            {
                return "https://api.pagar.me/1/";
            }
        }

        /// <summary>
        /// Retorna sua chave de API da PagarMe
        /// </summary>
        protected string apiKey
        {
            get
            {
                return "ak_test_SuaApiKey";
            }
        }

        /// <summary>
        /// Retorna sua chave de criptografia da PagarMe
        /// </summary>
        protected string encryptionKey
        {
            get
            {
                return "ek_test_SuaEncryptionKey";
            }
        }

        /// <summary>
        /// Retorna sua chave de criptografia da PagarMe
        /// </summary>
        protected string welcomeMessage
        {
            get
            {
                return "  PagarMePOS  "; //16c.
            }
        }

        /// <summary>
        /// Retorna lista de bandeiras permitidas para transações em crédito
        /// </summary>
        public List<BrandCredit> creditBrands
        {
            get
            {
                List<BrandCredit> brands = new List<BrandCredit>();
                //brands.Add(BrandCredit.visa);
                //brands.Add(BrandCredit.mastercard);
                return brands;
            }
        }

        /// <summary>
        /// Retorna lista de bandeiras permitidas para transações em débito
        /// </summary>
        public List<BrandDebit> debitBrands
        {
            get
            {
                List<BrandDebit> brands = new List<BrandDebit>();
                //brands.Add(BrandDebit.elo);
                return brands;
            }
        }
    }
}
