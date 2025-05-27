

using Microsoft.AspNetCore.Http;

namespace ComplaintPortal.Entities.DTO
{
    public class RegisterComplaintRequest
    {
        public int WardID { get; set; }
        public decimal GeoLat { get; set; }
        public decimal GeoLong { get; set; }
        public string Description { get; set; }
        public int ComplaintTypeID { get; set; }

        public IFormFile? Image1 { get; set; }
        public IFormFile? Image2 { get; set; }
        public IFormFile? Image3 { get; set; }
    }
}
