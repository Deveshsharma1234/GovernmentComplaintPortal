// ComplaintPortal.DataAccess.Repository.Contracts/IComplaintTypeRepository.cs
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.Models; // Make sure to include your model namespace
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ComplaintPortal.DataAccess.Repository.Contracts
{
    public interface IComplaintTypeRepository
    {
        // Basic CRUD operations for ComplaintType
        Task<complainttype?> GetComplaintTypeByIdAsync(int id);
        Task<IEnumerable<complainttype>> GetAllComplaintTypesAsync();
        Task AddComplaintTypeAsync(complainttype type);
        void UpdateComplaintType(complainttype type);
        void DeleteComplaintType(complainttype type);

        // Specific methods
        Task<IEnumerable<ComplaintTypeStatsDto>> GetComplaintTypeStatsAsync();

        // Add a SaveChanges method to the repository
        Task<int> SaveChangesAsync();
    }
}