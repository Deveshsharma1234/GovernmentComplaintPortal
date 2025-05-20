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
    public class CityRepository : ICityRepository
    {

        private readonly AppDbContext _context;

        public CityRepository(AppDbContext context)
        {
            _context = context;
        }

        public  async Task<List<city>> CitiesByDistrictId(int districId)
        {
            return await _context.cities
                        .Where(c => c.DistrictID == districId)
                        .ToListAsync();
        }



        public  async Task<List<city>> GetAllCities()
        {
            return await _context.cities.ToListAsync();
            
        }

     
    }
}
