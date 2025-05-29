using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.DataAccess.Repository.Contracts
{
    public interface IComplaintStatusRepository
    {
        // Basic CRUD operations for ComplaintStatus
        Task<complaintstatus?> GetComplaintStatusByIdAsync(int id);
        Task<IEnumerable<complaintstatus>> GetAllComplaintStatusesAsync();
        Task AddComplaintStatusAsync(complaintstatus status);
        void UpdateComplaintStatus(complaintstatus status);
        void DeleteComplaintStatus(complaintstatus status);

        // Specific methods
        Task<ComplaintStatsDto> GetComplaintStatusStatsAsync();

        // Add a SaveChanges method to the repository
        Task<int> SaveChangesAsync();
    }
}
