using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Business.Contracts
{
    public interface IComplaintService
    {
        // Complaint-specific operations
        Task<List<ComplaintResponseDto>> GetAllComplaintsAsync();
        Task<List<SimpleComplaintDto>> GetRawComplaintsByUserIdAsync(int userId);
        Task<bool> UpdateComplaintStatusAsync(int complaintId, int status);
        Task RegisterComplaintAsync(RegisterComplaintRequest request);
        Task<bool> SoftDeleteComplaintAsync(int complaintId); // Added for soft delete
        Task<IEnumerable<SimpleComplaintDto>> GetComplaintsByStatusIdAsync(int statusId); // Added for filtering by status

        // Complaint Type-related operations (can be here or in a separate service)
        Task<IEnumerable<complainttype>> GetAllComplaintTypesAsync(); // Added to get all complaint types
        Task<IEnumerable<ComplaintTypeStatsDto>> GetComplaintTypeStatsAsync(); // Added for complaint type statistics

        // Complaint Status-related operations (can be here or in a separate service)
        Task<IEnumerable<complaintstatus>> GetAllStatusesAsync(); // Added to get all statuses
        Task<ComplaintStatsDto> GetOverallComplaintStatsAsync(); // Added for overall complaint statistics
    }
}
