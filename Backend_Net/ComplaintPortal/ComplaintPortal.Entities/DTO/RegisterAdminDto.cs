using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Entities.DTO
{
   public class RegisterAdminDto : RegisterCitizenDto
    {
        public int RoleId { get; set; } // 3 or 2
    }
}
