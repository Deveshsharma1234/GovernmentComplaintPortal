using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Entities.DTO
{
  public  class UserUpdateDto
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
     
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Pincode { get; set; }
        public string State { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        //public int RoleId { get; set; }
        //public int ActiveState { get; set; }
        //public string? ModifiedBy { get; set; }
        //public DateTime? ModifiedDate { get; set; }

    }
}


/*
 * FirstName,
            LastName,
            Phone,
            Address,
            Pincode,
            State,
            District,
            City
 
 */