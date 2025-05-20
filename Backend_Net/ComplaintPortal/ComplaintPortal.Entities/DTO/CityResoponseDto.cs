using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Entities.DTO
{
    public class CityResoponseDto
    {
        public int CityID { get; set; }
        public string City { get; set; }
        public int DistrictID { get; set; }
        public int StateID { get; set; }
        public string CreatedBy  { get; set; }

        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public int  ActiveStatus { get; set; }

    }
}


/*  
 *          "CityID": 1,
            "City": "SGM",
            "DistrictID": 508,
            "StateID": 21,
            "CreatedBy": "system",
            "CreatedDate": "2025-05-14T19:23:00.000Z",
            "ModifiedBy": "system",
            "ModifiedDate": "2025-05-14T19:23:00.000Z",
            "ActiveStatus": 1
*/

