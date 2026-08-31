namespace ArukuNaati.Server.DTOs
{
    public class QualityInspectionDto
    {
        public string ProcurementId { get; set; }

        public decimal Moisture { get; set; }

        public string Size { get; set; }

        public decimal Damage { get; set; }

        public string Color { get; set; }

        public string Ripeness { get; set; }

        public decimal ForeignMaterial { get; set; }

        public string QualityGrade { get; set; }

        public string Inspector { get; set; }
    }
}