using System;
using System.Collections.Generic;

namespace ComplaintPortal.Entities.Models;

public partial class city
{
    public int CityID { get; set; }

    public string City { get; set; } = null!;

    public int? DistrictID { get; set; }

    public int? StateID { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public bool? ActiveStatus { get; set; }

    public virtual district? District { get; set; }

    public virtual state? State { get; set; }

    public virtual ICollection<ward> wards { get; set; } = new List<ward>();
}
