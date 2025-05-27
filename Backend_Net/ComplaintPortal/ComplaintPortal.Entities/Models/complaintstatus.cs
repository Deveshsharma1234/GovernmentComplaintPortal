using System;
using System.Collections.Generic;

namespace ComplaintPortal.Entities.Models;

public partial class complaintstatus
{
    public int StatusID { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<complaint> complaints { get; set; } = new List<complaint>();
}
