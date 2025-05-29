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
    public class ComplaintStatusRepository : IComplaintStatusRepository
    {
        private readonly AppDbContext _context;

        public ComplaintStatusRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<complaintstatus?> GetComplaintStatusByIdAsync(int id)
        {
            return await _context.complaintstatuses.FindAsync(id);
        }

        public async Task<IEnumerable<complaintstatus>> GetAllComplaintStatusesAsync()
        {
            return await _context.complaintstatuses.ToListAsync();
        }

        public async Task AddComplaintStatusAsync(complaintstatus status)
        {
            await _context.complaintstatuses.AddAsync(status);
        }

        public void UpdateComplaintStatus(complaintstatus status)
        {
            _context.complaintstatuses.Attach(status);
            _context.Entry(status).State = EntityState.Modified;
        }

        public void DeleteComplaintStatus(complaintstatus status)
        {
            _context.complaintstatuses.Remove(status);
        }

        public async Task<ComplaintStatsDto> GetComplaintStatusStatsAsync()
        {
            // First, get counts for each status
            var statusCounts = await _context.complaintstatuses
                .Select(cs => new StatusComplaintCountDto
                {
                    StatusName = cs.Status,
                    ComplaintCount = cs.complaints.Count // Access the navigation property to count related complaints
                })
                .ToListAsync();

            // Then, get the total number of complaints
            var totalComplaints = await _context.complaints.CountAsync();

            // Combine them into the ComplaintStatsDto
            return new ComplaintStatsDto
            {
                TotalComplaints = totalComplaints,
                Statuses = statusCounts
            };
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
