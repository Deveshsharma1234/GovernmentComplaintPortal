using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Business.Contracts;
using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.Models;

namespace ComplaintPortal.Business.Classes
{

    public class CityService : ICityService
    {

        public readonly ICityRepository cityRepository;
        public CityService(ICityRepository cityRepository)
        {
            this.cityRepository = cityRepository ?? throw new ArgumentNullException(nameof(cityRepository));
        }
        public async Task<List<city>> CitiesByDistrictId(int districtId)
        {
            if(districtId != 0) return await cityRepository.CitiesByDistrictId(districtId);
            throw new Exception("District Id not found");
        }

        public async Task<List<city>> GetAllCities()
        {
            return await cityRepository.GetAllCities();
        }
    }
}
