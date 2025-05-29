using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.Models;

namespace ComplaintPortal.DataAccess.Repository.Contracts
{
     public interface IStateRepository
    {
        Task<List<StateResponseDto>> GetStates();
    }
}
