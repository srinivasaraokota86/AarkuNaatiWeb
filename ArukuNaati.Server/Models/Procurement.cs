using System.ComponentModel.DataAnnotations;

namespace ArukuNaati.Server.Models
{
    public class Procurement
    {
        [Key]
        public string ProcurementId { get; set; } = string.Empty;

        public DateTime ProcurementDate { get; set; }

        public string FarmerCode { get; set; } = string.Empty;

        public string FarmerName { get; set; } = string.Empty;

        public string MobileNumber { get; set; } = string.Empty;

        public string Village { get; set; } = string.Empty;

        public string Fpo { get; set; } = string.Empty;

        public string Mandal { get; set; } = string.Empty;

        public string District { get; set; } = string.Empty;

        public string State { get; set; } = string.Empty;

        public string Commodity { get; set; } = string.Empty;

        public string CropType { get; set; } = string.Empty;

        public string Grade { get; set; } = string.Empty;

        public string LotNo { get; set; } = string.Empty;

        public decimal Quantity { get; set; }

        public int Bags { get; set; }

        public decimal Moisture { get; set; }

        public string Quality { get; set; } = string.Empty;

        public string Unit { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public decimal TotalAmount { get; set; }

        public string Remarks { get; set; } = string.Empty;

        public decimal? Latitude { get; set; }

        public decimal? Longitude { get; set; }

        public DateTime CreatedDate { get; set; }

        public bool IsActive { get; set; }
    }
}