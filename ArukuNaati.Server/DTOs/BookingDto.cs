namespace ArukuNaati.Server.DTOs
{
    public class BookingDto
    {
        public int Id { get; set; }
        public string FarmerName { get; set; } = string.Empty;
        public string MobileNumber { get; set; } = string.Empty;
        public string? FpoOrganization { get; set; }
        public string? AlternateContact { get; set; }
        public string State { get; set; } = string.Empty;
        public string District { get; set; } = string.Empty;
        public string? Mandal { get; set; }
        public string Village { get; set; } = string.Empty;
        public string? SurveyNumber { get; set; }
        public decimal LandArea { get; set; }
        public string ServiceRequired { get; set; } = string.Empty;
        public string Crop { get; set; } = string.Empty;
        public string? CropStage { get; set; }
        public string? ProblemPurpose { get; set; }
        public string PreferredDate { get; set; } = string.Empty;
        public string? PreferredTime { get; set; }
        public string? AdditionalNotes { get; set; }
    }
}
