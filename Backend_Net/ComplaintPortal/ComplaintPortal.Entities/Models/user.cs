using System;
using System.Collections.Generic;

namespace ComplaintPortal.Entities.Models;

public partial class user
{
    public int UserId { get; set; }

    public string FirstName { get; set; } = null!;

    public string? MiddleName { get; set; }

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string? Address { get; set; }

    public string? Pincode { get; set; }

    public string State { get; set; } = null!;

    public string District { get; set; } = null!;

    public string City { get; set; } = null!;

    public bool? IsRegistered { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public bool? ActiveState { get; set; }

    public string? ModifiedBy { get; set; }

    public int? RoleId { get; set; }

    public string Password { get; set; } = null!;

    public virtual role? Role { get; set; }

    public virtual ICollection<complaint> complaints { get; set; } = new List<complaint>();
}
