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
    public class WardService : IWardService
    {
        public readonly IWardRepository wardRepository;

        public WardService(IWardRepository wardRepository)
        {
            this.wardRepository = wardRepository;
        }

        public async Task<List<ward>> GetWards()
        {
             return await wardRepository.GetAllWards();
        }

        public async Task<List<ward>> GetWardsByCity(int cityId)
        {
            return await wardRepository.GetWardsWithCityId(cityId);
        }
    }
}
