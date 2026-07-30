using System.ComponentModel.DataAnnotations;

namespace ArukuNaati.Server.Models
{
  
        public class User
        {
            [Key]
            public int UserId { get; set; }

            public string? UserName { get; set; }

            public string? Password { get; set; }
        public string? Email { get; set; }
        public string? ResetToken { get; set; }
        public DateTime? ResetTokenExpiry { get; set; }

    }
}



