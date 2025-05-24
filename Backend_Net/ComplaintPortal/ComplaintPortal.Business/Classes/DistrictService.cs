using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Business.Contracts;
using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.DTO;

namespace ComplaintPortal.Business.Classes
{
    public class DistrictService : IDistrictService
    {
        public readonly IDistrictRepository districtRepository;

        public DistrictService(IDistrictRepository districtRepository)
        {
            this.districtRepository = districtRepository;
        }

        public async Task<List<DistrictResponseDto>> GetAllDistricts()
        {
            return await districtRepository.GetAllDistricts();
            
        }

        public async Task<List<DistrictResponseDto>> GetDistrictsByStateId(int stateId)
        {
            return await districtRepository.GetDistrictByStateId(stateId);
        }
    }
}
