using System;
using System.Collections.Generic;

namespace ComplaintPortal.Entities.Models;

public partial class district
{
    public int DistrictID { get; set; }

    public string District { get; set; } = null!;

    public int? StateID { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public bool? ActiveStatus { get; set; }

    public virtual state? State { get; set; }

    public virtual ICollection<city> cities { get; set; } = new List<city>();
}
