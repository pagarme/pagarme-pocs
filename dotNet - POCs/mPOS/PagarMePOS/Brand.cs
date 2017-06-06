using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PagarMePOS
{
    /// <summary>
    /// Bandeiras permitidas para pagamento em cartão de crédito
    /// </summary>
    public enum BrandCredit
    {
        visa,
        mastercard,
        americanexpress,
        elo,
        hipercard,
        diners,
        discovery,
        aura,
        jcb,
    }
    
    /// <summary>
    /// Bandeiras permitidas para pagamento em cartão de débito
    /// </summary>
    public enum BrandDebit
    {
        visa,
        mastercard,
        americanexpress,
        elo,
        hipercard,
        diners,
        discovery,
        aura,
        jcb,
    }
}
