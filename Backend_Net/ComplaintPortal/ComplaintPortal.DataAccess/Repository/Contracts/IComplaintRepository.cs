using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.DataAccess.Repository.Contracts
{
    public interface IComplaintRepository
    {
        Task<bool> UpdateComplaintStatusAsync(int complaintId, int status);
        Task<List<SimpleComplaintDto>> GetRawComplaintsByUserIdAsync(int userId);
        Task<List<ComplaintResponseDto>> GetAllComplaintsAsync();

        Task AddComplaintAsync(complaint complaint);

    }
}
