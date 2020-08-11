using PagarMePoCs.Net.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace PagarMePoCs.Net
{
    public static class PoCFactory
    {
        public static IPoC Construct(String PoCName)
        {
            IPoC objPoc = null;

            Assembly a = Assembly.GetExecutingAssembly();
            string typeName = a.GetName().Name + ".Entities." + PoCName;
            objPoc = (IPoC) a.CreateInstance(typeName, true);

            return objPoc;
        }
    }
}