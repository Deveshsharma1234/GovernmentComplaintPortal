using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.EFCore;
using ComplaintPortal.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;

using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.DataAccess.Repository.Classes
{
    public class ComplaintRepository : IComplaintRepository
    {

        public readonly AppDbContext _context;

        public ComplaintRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ComplaintResponseDto>> GetAllComplaintsAsync()
        {
            var complaints = await _context.complaints
                .Include(c => c.StatusNavigation)
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

            return complaints;
        }


        public async Task<List<SimpleComplaintDto>> GetRawComplaintsByUserIdAsync(int userId)
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


        public async Task<bool> UpdateComplaintStatusAsync(int complaintId, int status)
        {
            var complaint = await _context.complaints.FindAsync(complaintId);
            if (complaint == null)
            {
                return false; // Complaint not found
            }

            complaint.Status = status;
            _context.complaints.Update(complaint);
            await _context.SaveChangesAsync();
            return true;
        }




        public async Task AddComplaintAsync(complaint complaint)
        {
            _context.complaints.Add(complaint);
            await _context.SaveChangesAsync();
        }




    }
}
