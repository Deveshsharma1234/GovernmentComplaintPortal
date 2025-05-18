using System;
using System.Collections.Generic;

namespace ComplaintPortal.Entities.Models;

public partial class role
{
    public int RoleId { get; set; }

    public string Role { get; set; } = null!;

    public string? createdBy { get; set; }

    public DateTime? createdDate { get; set; }

    public DateTime? modifiedDate { get; set; }

    public bool? activeState { get; set; }

    public virtual ICollection<user> users { get; set; } = new List<user>();
}
