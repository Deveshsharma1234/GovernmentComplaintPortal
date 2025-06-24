using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Entities.Models
{
    public class RefreshToken
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(256)] // Adjust length as needed, 256 for Base64 string is usually sufficient
        public string Token { get; set; } = string.Empty;

        [Required]
        public int UserId { get; set; } // Foreign key to your user table

        [Required]
        public DateTime Expires { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;

        public DateTime? Revoked { get; set; }

        [NotMapped] // This property won't be mapped to the database
        public bool IsExpired => DateTime.UtcNow >= Expires;

        [NotMapped]
        public bool IsRevoked => Revoked != null;

        [NotMapped]
        public bool IsActive => !IsRevoked && !IsExpired;

        // Navigation property
        [ForeignKey("UserId")]
        public user User { get; set; } // Link to your existing 'user' entity
    }
}
