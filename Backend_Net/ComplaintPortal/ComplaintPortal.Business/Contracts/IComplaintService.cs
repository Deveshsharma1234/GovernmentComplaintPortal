using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Entities.DTO;

namespace ComplaintPortal.Business.Contracts
{
 public   interface IComplaintService
    {
      Task<List<ComplaintResponseDto>> GetAllComplaintsAsync();
        Task<List<SimpleComplaintDto>> GetRawComplaintsByUserIdAsync(int userId);
        Task<bool> UpdateComplaintStatusAsync(int complaintId, int status);
        Task RegisterComplaintAsync(RegisterComplaintRequest request);

    }
}
