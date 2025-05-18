using System;
using System.Collections.Generic;

namespace ComplaintPortal.Entities.Models;

public partial class complainttype
{
    public int ComplaintTypeID { get; set; }

    public string ComplaintType { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<complaint> complaints { get; set; } = new List<complaint>();
}
