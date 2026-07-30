using System.ComponentModel.DataAnnotations;

namespace ArukuNaati.Server.Models
{
    public class Farmers
    {
        [Key]
        public string Id { get; set; }

        public string FarmerCode { get; set; }

        public string Name { get; set; }

        public string Mobile { get; set; }

        //public string Village { get; set; }

        public string AadharNo { get; set; }

        public string GSTNO { get; set; }
        public bool ISActive { get; set; }
        public DateTime? CreatedDate { get; set; }

        //public string Email { get; set; }
    }
}
