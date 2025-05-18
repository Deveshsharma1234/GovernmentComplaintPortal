using System;
using System.Collections.Generic;

namespace ComplaintPortal.Entities.Models;

public partial class ward
{
    public int WardID { get; set; }

    public string City { get; set; } = null!;

    public int? CityID { get; set; }

    public string? AreaCovered { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public bool? ActiveStatus { get; set; }

    public virtual city? CityNavigation { get; set; }

    public virtual ICollection<complaint> complaints { get; set; } = new List<complaint>();
}
