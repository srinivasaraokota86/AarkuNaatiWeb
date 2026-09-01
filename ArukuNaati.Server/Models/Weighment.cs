using System.ComponentModel.DataAnnotations;

namespace ArukuNaati.Server.Models
{
    public class Weighment
    {
        [Key]
        public int WeighmentId { get; set; }

        public string Token { get; set; } = string.Empty;

        public decimal GrossWeight { get; set; }

        public decimal TareWeight { get; set; }

        public decimal NetWeight { get; set; }

        public int NoOfBags { get; set; }

        public string WeightSlipNo { get; set; } = string.Empty;

        public string WeighBridge { get; set; } = string.Empty;
    }
}