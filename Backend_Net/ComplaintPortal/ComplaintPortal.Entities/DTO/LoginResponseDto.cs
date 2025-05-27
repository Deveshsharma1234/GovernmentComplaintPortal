using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Entities.Models;

namespace ComplaintPortal.Entities.DTO
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public user User { get; set; } // You can use a specific DTO class instead of object
    }

}
