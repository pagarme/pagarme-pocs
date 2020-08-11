using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PagarMePoCs.Net
{
    public class PoCModel
    {
        public Int32 Id { get; set; }
        public String Name { get; set; }

        public PoCModel()
             : this(new Nullable<Int32>().Value, String.Empty)
        {
        }

        public PoCModel(Int32 id, String name)
        {
            Id = id;
            Name = name;
        }
    }
}