using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Entities.DTO
{
   public class UserResponseDto
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Pincode { get; set; }
        public string State { get; set; }
        public string District { get; set; }
        public string  City { get; set; }
        public int? RoleId { get; set; }

    }
}


/*
 * "users": [
        {
            "UserId": 1,
            "FirstName": "Rahul",
            "LastName": "Patil",
            "Email": "rahul.patil@gov.in",
            "Phone": "9876543210",
            "Address": "Railway Quarters",
            "Pincode": "411001",
            "State": "Maharashtra",
            "District": "Pune",
            "City": "Shivajinagar",
            "RoleId": 1
        },
 
 */