using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Entities.Models;

namespace ComplaintPortal.DataAccess.Repository.Contracts
{
    public interface ICityRepository
    {
       

        Task<List<city>> GetAllCities(); // returns list
        Task<List<city>> CitiesByDistrictId(int districId); 
    }
}
