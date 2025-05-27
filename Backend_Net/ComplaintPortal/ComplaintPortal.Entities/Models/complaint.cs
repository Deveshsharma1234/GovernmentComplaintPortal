using System;
using System.Collections.Generic;

namespace ComplaintPortal.Entities.Models;

public partial class complaint
{
    public int ComplaintID { get; set; }

    public int? WardID { get; set; }

    public decimal? GeoLat { get; set; }

    public decimal? GeoLong { get; set; }

    public string? Description { get; set; }

    public string? Image1 { get; set; }

    public string? Image2 { get; set; }

    public string? Image3 { get; set; }

    public int? ComplaintTypeID { get; set; }

    public int? UserID { get; set; }

    public int? Status { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public bool? ActiveStatus { get; set; }

    public virtual complainttype? ComplaintType { get; set; }

    public virtual complaintstatus? StatusNavigation { get; set; }

    public virtual user? User { get; set; }

    public virtual ward? Ward { get; set; }
}
