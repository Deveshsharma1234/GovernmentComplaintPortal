using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Entities.Models;

namespace ComplaintPortal.Business.Contracts
{
   
     public interface IWardService
    {
        Task<List<ward>> GetWards();
        Task<List<ward>> GetWardsByCity(int cityId);

    }
}
