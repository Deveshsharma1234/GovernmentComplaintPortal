using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Entities.DTO
{
    public class TokenAndRefreshTokenDto
    {
        public string token { get; set; }
        public string refreshToken { get; set; }
    }
}
