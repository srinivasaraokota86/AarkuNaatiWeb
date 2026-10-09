using System.ComponentModel.DataAnnotations;

namespace ArukuNaati.Server.DTOs
{
    public class UpdatePilotDto
    {
        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required]
        public string MobileNumber { get; set; } = string.Empty;

        public string? Email { get; set; }

        public string? AadhaarOrIdProof { get; set; }

        public string? Address { get; set; }

        public string? Village { get; set; }

        public string? Mandal { get; set; }

        public string? District { get; set; }

        public string? State { get; set; }

        public string? ProfilePhotoUrl { get; set; }
    }
}
