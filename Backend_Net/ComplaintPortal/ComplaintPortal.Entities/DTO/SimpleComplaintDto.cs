﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Entities.DTO
{
    public class SimpleComplaintDto
    {
        public int ComplaintID { get; set; }
        public int? WardID { get; set; }
        public decimal? GeoLat { get; set; }
        public decimal? GeoLong { get; set; }
        public string? Description { get; set; }
        public string? Image1 { get; set; }
        public string? Image2 { get; set; }
        public string? Image3 { get; set; }
        public int? ComplaintTypeID { get; set; }
        public int? UserID { get; set; }
        public int? Status { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool? ActiveStatus { get; set; }
    }

}
