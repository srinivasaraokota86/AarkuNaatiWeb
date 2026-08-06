
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ArukuNaati.Server.Models
{
    public class FarmerPayment
    {
        [Key]
        public int Id { get; set; }

        [StringLength(20)]
        public string? FarmerId { get; set; }

        [ForeignKey(nameof(FarmerId))]
        public Farmers? Farmer { get; set; }
        [Required]
        public string Bank { get; set; }

        [Required]
        public string AccountNo { get; set; }

        [Required]
        public string IFSC { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required]
        public string PaymentMethod { get; set; }

        public string? ReferenceNo { get; set; }

        public DateTime PaymentDate { get; set; }

        public bool Release { get; set; }
    }
}