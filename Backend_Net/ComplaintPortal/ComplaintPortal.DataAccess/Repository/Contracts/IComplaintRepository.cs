// ComplaintPortal.DataAccess.Repository.Contracts/IComplaintRepository.cs
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions; // Make sure this is included for Expression

namespace ComplaintPortal.DataAccess.Repository.Contracts
{
    public interface IComplaintRepository
    {
        // CRUD operations for Complaint
        Task<complaint?> GetComplaintByIdAsync(int id); // Specific GetById
        Task AddComplaintAsync(complaint complaint);
        void UpdateComplaint(complaint complaint); // Update method
        void DeleteComplaint(complaint complaint); // Delete method (hard delete)
        Task<IEnumerable<complaint>> GetAllComplaintsRawAsync(); // Get all complaints (raw entities)
        Task<IEnumerable<complaint>> FindComplaintsAsync(Expression<Func<complaint, bool>> predicate); // Find by expression

        // Specific methods
        Task<bool> SoftDeleteComplaintAsync(int complaintId);
        Task<List<ComplaintResponseDto>> GetAllComplaintsWithDetailsAsync();
        Task<List<SimpleComplaintDto>> GetComplaintsByUserIdAsync(int userId);
        Task<List<SimpleComplaintDto>> GetComplaintsByStatusIdAsync(int statusId);

        // Add a SaveChanges method to the repository
        Task<int> SaveChangesAsync();
    }
}