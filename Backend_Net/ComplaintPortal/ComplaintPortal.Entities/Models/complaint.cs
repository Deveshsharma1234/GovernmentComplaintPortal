// ComplaintPortal.Entities.Models/complaint.cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations; // Add this namespace
using System.ComponentModel.DataAnnotations.Schema; // Add this namespace

namespace ComplaintPortal.Entities.Models;

public partial class complaint
{
    [Key] // Explicitly mark the primary key
    public int ComplaintID { get; set; }

    public int? WardID { get; set; }

    public decimal? GeoLat { get; set; }

    public decimal? GeoLong { get; set; }

    public string? Description { get; set; }

    public string? Image1 { get; set; }

    public string? Image2 { get; set; }

    public string? Image3 { get; set; }

    // Foreign key relationship for ComplaintType
    [ForeignKey("complainttype")] // Specify table name if different from navigation property name
    public int? ComplaintTypeID { get; set; }
    public virtual complainttype? ComplaintType { get; set; }

    public int? UserID { get; set; }

    // Foreign key relationship for ComplaintStatus
    // Make sure 'Status' property name aligns with your DB column for the FK
    [ForeignKey("complaintstatus")]
    public int? Status { get; set; }
    public virtual complaintstatus? StatusNavigation { get; set; } // Renamed from Status to StatusNavigation as per your model

    public string? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public bool? ActiveStatus { get; set; } // Using nullable bool as per your model

    // Other navigation properties
    public virtual user? User { get; set; }
    public virtual ward? Ward { get; set; }
}