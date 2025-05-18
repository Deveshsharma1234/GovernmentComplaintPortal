using System;
using System.Collections.Generic;

namespace ComplaintPortal.Entities.Models;

public partial class state
{
    public int StateId { get; set; }

    public string? State { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public bool? ActiveStatus { get; set; }

    public virtual ICollection<city> cities { get; set; } = new List<city>();

    public virtual ICollection<district> districts { get; set; } = new List<district>();
}
