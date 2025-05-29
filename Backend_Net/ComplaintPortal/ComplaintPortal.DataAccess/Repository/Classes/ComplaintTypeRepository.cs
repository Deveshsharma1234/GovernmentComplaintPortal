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
    public class ComplaintTypeRepository : IComplaintTypeRepository
    {
        private readonly AppDbContext _context;

        public ComplaintTypeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<complainttype?> GetComplaintTypeByIdAsync(int id)
        {
            return await _context.complainttypes.FindAsync(id);
        }

        public async Task<IEnumerable<complainttype>> GetAllComplaintTypesAsync()
        {
            return await _context.complainttypes.ToListAsync();
        }

        public async Task AddComplaintTypeAsync(complainttype type)
        {
            await _context.complainttypes.AddAsync(type);
        }

        public void UpdateComplaintType(complainttype type)
        {
            _context.complainttypes.Attach(type);
            _context.Entry(type).State = EntityState.Modified;
        }

        public void DeleteComplaintType(complainttype type)
        {
            _context.complainttypes.Remove(type);
        }

        public async Task<IEnumerable<ComplaintTypeStatsDto>> GetComplaintTypeStatsAsync()
        {
            // This query fetches complaint types and counts related complaints
            return await _context.complainttypes
                .Select(ct => new ComplaintTypeStatsDto
                {
                    ComplaintType = ct.ComplaintType,
                    ComplaintCount = ct.complaints.Count // Access the navigation property to count
                })
                .ToListAsync();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
