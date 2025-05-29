using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Entities.DTO
{
    public class StateResponseDto
    {
        public int StateId { get; set; }
       public string State { get; set; }
        public string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public bool ActiveStatus { get; set; }
    }
}
