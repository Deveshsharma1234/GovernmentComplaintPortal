using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Entities.DTO;

namespace ComplaintPortal.Business.Contracts
{
  public  interface IDistrictService
    {
        Task<List<DistrictResponseDto>> GetAllDistricts();
        Task<List<DistrictResponseDto>> GetDistrictsByStateId(int stateId);

    }
}
