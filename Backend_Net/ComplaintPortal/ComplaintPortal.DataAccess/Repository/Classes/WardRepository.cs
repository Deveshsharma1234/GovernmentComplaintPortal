using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.EFCore;
using ComplaintPortal.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace ComplaintPortal.DataAccess.Repository.Classes
{
    public class WardRepository : IWardRepository
    {
        public readonly AppDbContext _context;
        public WardRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ward>> GetAllWards()
        {
            return await _context.wards.ToListAsync();
        }

        public async Task<List<ward>> GetWardsWithCityId(int  cityId)
        {
            return await _context.wards.Where(w => w.CityID == cityId).ToListAsync();
            
        }
    }
}
