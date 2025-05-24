using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.EFCore;
using Microsoft.EntityFrameworkCore;

namespace ComplaintPortal.DataAccess.Repository.Classes
{
    public class DistrictRepository : IDistrictRepository
    {
        public AppDbContext _context;

        public DistrictRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<DistrictResponseDto>> GetAllDistricts()
        {
            return await _context.districts.Select(d => new DistrictResponseDto
            {
                DistrictID = d.DistrictID,
                District = d.District,
                StateID = d.StateID,
                CreatedBy = d.CreatedBy,
                CreatedDate = d.CreatedDate,
              ActiveStatus = d.ActiveStatus,
              ModifiedBy = d.ModifiedBy,
              ModifiedDate = d.ModifiedDate
                

            }).ToListAsync();
        }

        public async Task<List<DistrictResponseDto>> GetDistrictByStateId(int stateId)
        {
            return await _context.districts.Where(d => d.StateID == stateId).Select(d => new DistrictResponseDto
            {
                DistrictID = d.DistrictID,
                District = d.District,
                StateID = d.StateID,
                CreatedBy = d.CreatedBy,
                CreatedDate = d.CreatedDate,
                ActiveStatus = d.ActiveStatus,
                ModifiedBy = d.ModifiedBy,
                ModifiedDate = d.ModifiedDate


            }).ToListAsync();
        }
    }
}
