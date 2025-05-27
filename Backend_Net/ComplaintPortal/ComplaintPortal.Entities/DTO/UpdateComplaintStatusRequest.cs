using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Entities.DTO
{
   public class UpdateComplaintStatusRequest
    {
        public int ComplaintId { get; set; }
        public int Status { get; set; }
    }
}
