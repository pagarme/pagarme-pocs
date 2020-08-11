using Newtonsoft.Json;
using PagarMe;
using PagarMe.Base;
using PagarMePoCs.Net.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace PagarMePoCs.Net
{
    class Program
    {
        static List<PoCModel> PoCs;
        static String ConsoleResponse = String.Empty;

        static void Main(string[] args)
        {
            PagarMeService.DefaultApiKey = "DEFINA_AQUI";
            PagarMeService.DefaultEncryptionKey = "DEFINA_AQUI";

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("PagarMe API Prove of Concept (PoCs)");

            Boolean Continue = true;

            try
            {
                PoCs = GetPoCs();

                while (Continue)
                {
                    ShowMenu();
                    Int32 Option;
                    Int32.TryParse(ConsoleResponse, out Option);

                    if (Option != 0 && Option <= PoCs.Count)
                    {
                        Console.ForegroundColor = ConsoleColor.Green;
                        Option--;

                        IPoC PoC = PoCFactory.Construct(PoCs[Option].Name);
                        PoC.Create();
                        Console.WriteLine(PoC.Title);

                        Model Model = PoC.GetModel();
                        String JsonObject = JsonConvert.SerializeObject(Model.ToDictionary(SerializationType.Full));

                        Console.Write("Id Gerado: ");
                        Console.ForegroundColor = ConsoleColor.Cyan;
                        Console.Write(Model.Id);
                        Console.WriteLine("");
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.Write("Objeto Gerado: ");
                        Console.ForegroundColor = ConsoleColor.Cyan;
                        Console.Write(JsonObject);
                    }
                    else
                        Continue = false;
                }
            }
            catch (PagarMeException ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("");
                foreach (PagarMeErrorDetail erro in ex.Error.Errors)
                    Console.WriteLine(String.Format("ERRO: {1}", erro.Parameter, erro.Message));

                Console.ReadKey();
            }
        }

        static void ShowMenu()
        {
            Console.WriteLine("");
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("============ MENU ============");

            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("[0] Fechar");

            foreach (PoCModel PoC in PoCs)
            {
                Console.WriteLine(String.Format("[{0}] {1}", PoC.Id, PoC.Name));
            }

            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("============ MENU ============");

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("");
            Console.Write("Escolha uma opção: ");
            ConsoleResponse = Console.ReadLine();
        }

        static List<PoCModel> GetPoCs()
        {
            List<PoCModel> PoCsList = null;

            Type[] Classes = Assembly.GetExecutingAssembly().GetTypes().Where(t => String.Equals(t.Namespace, "PagarMePoCs.Net.Entities", StringComparison.Ordinal)).ToArray();

            if (Classes.Count() > 0)
            {
                PoCsList = new List<PoCModel>();

                Int32 i = 1;

                foreach (Type Classe in Classes)
                {
                    PoCsList.Add(new PoCModel(i, Classe.Name));
                    i++;
                }
            }

            return PoCsList;
        }
    }
}