using System.ComponentModel.DataAnnotations;

namespace ArukuNaati.Server.Models
{
    public class FarmerPayments
    {
        [Key]
        public int PaymentId { get; set; }

        public string FarmerCode { get; set; } = string.Empty;

        public string FarmerName { get; set; } = string.Empty;

        public string BankName { get; set; } = string.Empty;

        public string AccountNumber { get; set; } = string.Empty;

        public string IFSCCode { get; set; } = string.Empty;

        public decimal Amount { get; set; }

        public string PaymentMethod { get; set; } = string.Empty;

        public string ReferenceNumber { get; set; } = string.Empty;

        public DateTime PaymentDate { get; set; }

        public bool Release { get; set; }
    }
}