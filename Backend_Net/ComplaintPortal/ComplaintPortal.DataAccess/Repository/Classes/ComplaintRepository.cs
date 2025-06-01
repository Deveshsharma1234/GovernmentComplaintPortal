// ComplaintPortal.DataAccess.Repository.Classes/ComplaintRepository.cs
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions; // Ensure this is present
using System.Threading.Tasks;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.EFCore;
using ComplaintPortal.Entities.Models;
using ComplaintPortal.DataAccess.Repository.Contracts;

namespace ComplaintPortal.DataAccess.Repository.Classes
{
    public class ComplaintRepository : IComplaintRepository
    {
        private readonly AppDbContext _context; // Keep DbContext private

        public ComplaintRepository(AppDbContext context)
        {
            _context = context;
        }

        // Basic CRUD operations (implementing IComplaintRepository)
        public async Task<complaint?> GetComplaintByIdAsync(int id)
        {
            return await _context.complaints.FindAsync(id);
        }

        public async Task AddComplaintAsync(complaint complaint)
        {
            await _context.complaints.AddAsync(complaint);
        }

        public void UpdateComplaint(complaint complaint)
        {
            _context.complaints.Attach(complaint);
            _context.Entry(complaint).State = EntityState.Modified;
        }

        public void DeleteComplaint(complaint complaint)
        {
            _context.complaints.Remove(complaint);
        }

        public async Task<IEnumerable<complaint>> GetAllComplaintsRawAsync()
        {
            return await _context.complaints.ToListAsync();
        }

        public async Task<IEnumerable<complaint>> FindComplaintsAsync(Expression<Func<complaint, bool>> predicate)
        {
            return await _context.complaints.Where(predicate).ToListAsync();
        }

        // Specific methods (your existing ones and new ones)
        public async Task<bool> SoftDeleteComplaintAsync(int complaintId)
        {
            var complaint = await _context.complaints.FindAsync(complaintId);
            if (complaint == null)
            {
                return false;
            }

            complaint.Status = 4; // Assuming 4 is the "Invalid" status ID
            complaint.ActiveStatus = false;
            complaint.ModifiedDate = DateTime.UtcNow;
            // No need to call _context.complaints.Update(complaint); if it's already tracked.
            // Just ensure changes are saved later in the service if this method doesn't save them.
            return true;
        }

        public async Task<List<ComplaintResponseDto>> GetAllComplaintsWithDetailsAsync()
        {
            return await _context.complaints
                .Include(c => c.StatusNavigation)
                .Include(c => c.ComplaintType)
                .Include(c => c.Ward)
                    .ThenInclude(w => w.CityNavigation)
                        .ThenInclude(ci => ci.District)
                            .ThenInclude(d => d.State)
                .Select(c => new ComplaintResponseDto
                {
                    ComplaintID = c.ComplaintID,
                    WardID = c.WardID,
                    GeoLat = c.GeoLat,
                    GeoLong = c.GeoLong,
                    Image1 = c.Image1,
                    Image2 = c.Image2,
                    Image3 = c.Image3,
                    ComplaintTypeID = c.ComplaintTypeID,
                    UserID = c.UserID,
                    Status = c.Status,
                    StatusName = c.StatusNavigation != null ? c.StatusNavigation.Status : null,
                    CreatedBy = c.CreatedBy,
                    CreatedDate = c.CreatedDate,
                    ModifiedBy = c.ModifiedBy,
                    ModifiedDate = c.ModifiedDate,
                    ActiveStatus = c.ActiveStatus,
                    Description = c.Description,
                    City = c.Ward != null && c.Ward.CityNavigation != null ? c.Ward.CityNavigation.City : null,
                    District = c.Ward != null && c.Ward.CityNavigation != null && c.Ward.CityNavigation.District != null ? c.Ward.CityNavigation.District.District : null,
                    State = c.Ward != null && c.Ward.CityNavigation != null && c.Ward.CityNavigation.District != null && c.Ward.CityNavigation.District.State != null ? c.Ward.CityNavigation.District.State.State : null

                })
                .ToListAsync();
        }

        public async Task<List<SimpleComplaintDto>> GetComplaintsByUserIdAsync(int userId)
        {
            return await _context.complaints
                .Where(c => c.UserID == userId)
                .Select(c => new SimpleComplaintDto
                {
                    ComplaintID = c.ComplaintID,
                    WardID = c.WardID,
                    GeoLat = c.GeoLat,
                    GeoLong = c.GeoLong,
                    Description = c.Description,
                    Image1 = c.Image1,
                    Image2 = c.Image2,
                    Image3 = c.Image3,
                    ComplaintTypeID = c.ComplaintTypeID,
                    UserID = c.UserID,
                    Status = c.Status,
                    CreatedBy = c.CreatedBy,
                    CreatedDate = c.CreatedDate,
                    ModifiedBy = c.ModifiedBy,
                    ModifiedDate = c.ModifiedDate,
                    ActiveStatus = c.ActiveStatus
                })
                .ToListAsync();
        }

        public async Task<List<SimpleComplaintDto>> GetComplaintsByStatusIdAsync(int statusId)
        {
            return await _context.complaints
                .Where(c => c.Status == statusId)
                .Select(c => new SimpleComplaintDto
                {
                    ComplaintID = c.ComplaintID,
                    WardID = c.WardID,
                    GeoLat = c.GeoLat,
                    GeoLong = c.GeoLong,
                    Description = c.Description,
                    Image1 = c.Image1,
                    Image2 = c.Image2,
                    Image3 = c.Image3,
                    ComplaintTypeID = c.ComplaintTypeID,
                    UserID = c.UserID,
                    Status = c.Status,
                    CreatedBy = c.CreatedBy,
                    CreatedDate = c.CreatedDate,
                    ModifiedBy = c.ModifiedBy,
                    ModifiedDate = c.ModifiedDate,
                    ActiveStatus = c.ActiveStatus
                })
                .ToListAsync();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}