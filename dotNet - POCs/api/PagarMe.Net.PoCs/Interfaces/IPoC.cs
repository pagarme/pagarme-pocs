using PagarMe.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PagarMePoCs.Net.Interfaces
{
    public interface IPoC
    {
        String Title { get; }
        void Create();
        Model GetModel();
    }
}