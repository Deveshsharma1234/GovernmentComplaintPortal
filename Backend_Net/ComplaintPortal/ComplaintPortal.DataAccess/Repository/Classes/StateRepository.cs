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
    public class StateRepository : IStateRepository
    {
        public readonly AppDbContext _context;

        public StateRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<state>> GetStates()
        {
            return await _context.states.ToListAsync();
        }
    }
}
