using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Entities.DTO
{
   public  class DistrictResponseDto
    {
        public int DistrictID { get; set; }

        public string District { get; set; }
        public int? StateID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ?CreatedDate { get; set; }

        public string ModifiedBy { get; set; }
        public DateTime ? ModifiedDate { get; set; }

        public Boolean ? ActiveStatus { get; set; }
    }
}




//"districts": [
//        {
//            "DistrictID": 1,
//            "District": "Anakapalli",
//            "StateID": 1,
//            "CreatedBy": "system",
//            "CreatedDate": "2025-05-14T17:44:02.000Z",
//            "ModifiedBy": "system",
//            "ModifiedDate": "2025-05-14T17:44:02.000Z",
//            "ActiveStatus": 1
//        },