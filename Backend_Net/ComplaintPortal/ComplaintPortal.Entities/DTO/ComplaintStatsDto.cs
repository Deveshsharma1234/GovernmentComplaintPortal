using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ComplaintPortal.Entities.DTO
{
    public class ComplaintStatsDto
    {
        [JsonPropertyName("totalComplaints")]
        public int totalComplaints { get; set; }
        [JsonPropertyName("statuses")]
        public IEnumerable<StatusComplaintCountDto> statuses { get; set; }
    }
}
