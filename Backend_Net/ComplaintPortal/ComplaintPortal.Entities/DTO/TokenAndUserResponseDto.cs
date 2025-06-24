using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Entities.Models;

namespace ComplaintPortal.Entities.DTO
{
    public class TokenAndUserResponseDto
    {
        public UserResponseDto UserResponse { get; set; }
        public string Token { get; set; } // Will be null if token is only in cookie
        public string RefreshToken { get; set; } // Only if you send it in body, otherwise via cookie 
        //                                        //Used these two so that we can pass these from 
                                                  //from service to controller
    }

}
