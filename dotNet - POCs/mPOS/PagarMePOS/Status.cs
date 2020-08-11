using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PagarMePOS
{
    class Status
    {
        public int code { get; set; }
        public string message { get; set; }
        public string description { get; set; }
        private Dictionary<int, string[]> erros = new Dictionary<int,string[]>();
        
        public Status(int statusCode)
        {
            erros.Add(-2, new string[] { "CHAVE INVALIDA", "Encryption Key inválida."});
            erros.Add(-1, new string[] { "FALHA DE CONEXAO", "Houve um erro de conexão de Internet da biblioteca Pagar.me ao executar a operação requisitada." });
            erros.Add(10, new string[] { "FLUXO INVALIDO", "O fluxo correto de execução de operações não está sendo seguido (ex. tentativa de processar pagamento sem inicialização)" });
            erros.Add(11, new string[] { "ERRO API 1", "Houve um erro da biblioteca Pagar.me ao executar a operação requisitada." });
            erros.Add(12, new string[] { "TEMPO EXCEDIDO", "Houve um timeout para a execução da operação requisitada." });
            erros.Add(13, new string[] { "OPERACAO\nCANCELADA", "A operação foi cancelada (por meio de uma função na biblioteca de cancelamento ou por meio do botão de cancelamento do pinpad)." });
            erros.Add(15, new string[] { "ERRO DE SESSAO", "Houve um erro na inicialização da sessão com o pinpad." });
            erros.Add(20, new string[] { "EMV NAO BAIXADA", "Tabelas EMV não foram baixadas corretamente." });
            erros.Add(42, new string[] { "CHAVE NAO\nCARREGADA", "As chaves do pinpad não foram carregadas corretamente." });
            erros.Add(60, new string[] { "CARTAO COM ERRO", "O cartão passado no pinpad não está funcionando propriamente." });
            erros.Add(70, new string[] { "BANDEIRA/FORMA\nINVALIDA", "Não há aplicação disponível no pinpad para processamento do cartão (por conta de tabelas EMV inconsistentes, bandeira não suportada pela Pagar.me ou cartão que não obedece aos filtros das opções de cartão ao processar um pagamento)." });
            erros.Add(90, new string[] { "ERRO API 2", "Houve um erro interno da biblioteca Pagar.me." });

            this.code = statusCode;
            this.message = erros[statusCode][0];
            this.description = erros[statusCode][1];
        }
        
    }
}
