using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Business.Contracts;
using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.Models;

namespace ComplaintPortal.Business.Classes
{
    public class StateService : IStateService
    {
        public readonly IStateRepository stateRepo;
        public StateService(IStateRepository stateRepository)
        {
            this.stateRepo = stateRepository;
        }
        public async Task<List<StateResponseDto>> GetStates()
        {
            return await stateRepo.GetStates();
        }
    }
}
