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
    public class ComplaintService : IComplaintService
    {

        public readonly IComplaintRepository complaintRepository;

        public ComplaintService(IComplaintRepository complaintRepository)
        {
            this.complaintRepository = complaintRepository;
        }

        public async Task<List<ComplaintResponseDto>> GetAllComplaintsAsync()
        {
            return await complaintRepository.GetAllComplaintsAsync();
        }

        public async Task<List<SimpleComplaintDto>> GetRawComplaintsByUserIdAsync(int userId)
        {
            return await complaintRepository.GetRawComplaintsByUserIdAsync(userId);
        }

        public async Task<bool> UpdateComplaintStatusAsync(int complaintId, int status)
        {
            return await complaintRepository.UpdateComplaintStatusAsync(complaintId, status);
        }
    }
}
