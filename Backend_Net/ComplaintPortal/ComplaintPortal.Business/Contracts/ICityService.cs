using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Entities.Models;

namespace ComplaintPortal.Business.Contracts
{
    public interface ICityService
    {
        Task<List<city>> GetAllCities();
        Task<List<city>> CitiesByDistrictId(int districtId);
    }
}
