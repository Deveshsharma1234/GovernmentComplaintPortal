using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Entities.DTO;

namespace ComplaintPortal.DataAccess.Repository.Contracts
{
   public interface IDistrictRepository
    {

        Task <List<DistrictResponseDto>> GetAllDistricts();
        Task<List<DistrictResponseDto>> GetDistrictByStateId(int stateId);
    }
}
