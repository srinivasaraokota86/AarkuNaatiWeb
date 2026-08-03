using System.ComponentModel.DataAnnotations;

namespace ArukuNaati.Server.Models
{
    public class RegisterRequest
    {
        [Key]
        public string Id { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

    }
}
