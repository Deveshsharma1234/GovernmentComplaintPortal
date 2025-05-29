using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Entities.DTO
{
    public class ComplaintStatsDto
    {
        public int TotalComplaints { get; set; }
        public IEnumerable<StatusComplaintCountDto> Statuses { get; set; }
    }
}
