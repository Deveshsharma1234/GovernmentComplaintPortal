using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Entities.DTO.ResponseDtos
{
    public class LoginResponseDto
    {
        public int? RoleId { get; set; }
        public UserResponseDto userResponseDto { get; set; }
    }
}
