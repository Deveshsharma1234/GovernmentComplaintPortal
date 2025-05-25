using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Entities.DTO;

namespace ComplaintPortal.DataAccess.Repository.Contracts
{
    public interface IComplaintRepository
    {
        Task<bool> UpdateComplaintStatusAsync(int complaintId, int status);
        Task<List<SimpleComplaintDto>> GetRawComplaintsByUserIdAsync(int userId);
        Task<List<ComplaintResponseDto>> GetAllComplaintsAsync();

    }
}
