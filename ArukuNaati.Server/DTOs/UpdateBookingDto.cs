using System.ComponentModel.DataAnnotations;

namespace ArukuNaati.Server.DTOs
{
    public class UpdateBookingDto
    {
        [Required]
        public string FarmerName { get; set; } = string.Empty;

        [Required]
        public string MobileNumber { get; set; } = string.Empty;

        public string? FpoOrganization { get; set; }

        public string? AlternateContact { get; set; }

        [Required]
        public string State { get; set; } = string.Empty;

        [Required]
        public string District { get; set; } = string.Empty;

        public string? Mandal { get; set; }

        [Required]
        public string Village { get; set; } = string.Empty;

        public string? SurveyNumber { get; set; }

        [Required]
        public decimal LandArea { get; set; }

        [Required]
        public string ServiceRequired { get; set; } = string.Empty;

        [Required]
        public string Crop { get; set; } = string.Empty;

        public string? CropStage { get; set; }

        public string? ProblemPurpose { get; set; }

        [Required]
        public string PreferredDate { get; set; } = string.Empty;

        public string? PreferredTime { get; set; }

        public string? AdditionalNotes { get; set; }
    }
}
