using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Entities.DTO.RequestDtos
{
    public class RefreshTokenRequest
    {
        public string RefreshToken { get; set; } // Not strictly needed if reading from cookie
    }
}
