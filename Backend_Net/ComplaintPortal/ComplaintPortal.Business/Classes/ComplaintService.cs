
﻿using ComplaintPortal.Business.Contracts;
using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;

using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ComplaintPortal.Business.Classes
{
    public class ComplaintService : IComplaintService
    {

        public readonly IComplaintRepository complaintRepository;

        private readonly IWebHostEnvironment _env;

        public ComplaintService(IComplaintRepository complaintRepository, IWebHostEnvironment env)
        {
            this.complaintRepository = complaintRepository;
            this._env = env;
        }


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

        public async Task RegisterComplaintAsync(RegisterComplaintRequest request)
        {
            var comp = new complaint
            {
                WardID = request.WardID,
                GeoLat = request.GeoLat,
                GeoLong = request.GeoLong,
                Description = request.Description,
                ComplaintTypeID = request.ComplaintTypeID,
                CreatedDate = DateTime.UtcNow,
                ActiveStatus = true,
                // Add more if needed, e.g. UserID or CreatedBy
            };

            // Handle optional image uploads
            if (request.Image1 != null)
                comp.Image1 = await SaveImageAsync(request.Image1);
            if (request.Image2 != null)
                comp.Image2 = await SaveImageAsync(request.Image2);
            if (request.Image3 != null)
                comp.Image3 = await SaveImageAsync(request.Image3);

            await complaintRepository.AddComplaintAsync(comp);
        }

        private async Task<string> SaveImageAsync(IFormFile file)
        {
            var folderPath = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads");
            Directory.CreateDirectory(folderPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var fullPath = Path.Combine(folderPath, fileName);

            using var stream = new FileStream(fullPath, FileMode.Create);
            await file.CopyToAsync(stream);

            return $"/uploads/{fileName}";
        }

        public async Task<bool> UpdateComplaintStatusAsync(int complaintId, int status)
        {
            return await complaintRepository.UpdateComplaintStatusAsync(complaintId, status);
        }
    }
}
