using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Entities.DTO
{
   public class RegisterAdminDto 
    {
        public int RoleId { get; set; } // 3 or 2
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Pincode { get; set; }
        public string State { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        public string Password { get; set; }
    }
}

/*
 
 FirstName, LastName, Email, Phone, Address, Pincode, State,
District, 
City, 
RoleId, 
Password
 
 */
