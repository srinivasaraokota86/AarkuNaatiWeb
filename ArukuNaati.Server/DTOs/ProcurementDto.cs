using System;

namespace ArukuNaati.Server.DTOs
{
    public class ProcurementDto
    {
        public string ProcurementId { get; set; }

        public DateTime ProcurementDate { get; set; }

        public string FarmerCode { get; set; }

        public string FarmerName { get; set; }

        public string Mobile { get; set; }

        public string Village { get; set; }

        public string FPO { get; set; }

        public string Mandal { get; set; }

        public string District { get; set; }

        public string State { get; set; }

        public string Commodity { get; set; }

        public string CropType { get; set; }

        public string Grade { get; set; }

        public string LotNo { get; set; }

        public int Bags { get; set; }

        public decimal Moisture { get; set; }

        public string Quality { get; set; }

        public decimal Quantity { get; set; }

        public string Unit { get; set; }

        public decimal Price { get; set; }

        public decimal TotalAmount { get; set; }

        public string Remarks { get; set; }

        public decimal? Latitude { get; set; }

        public decimal? Longitude { get; set; }
    }
}