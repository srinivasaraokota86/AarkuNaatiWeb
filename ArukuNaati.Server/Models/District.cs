using System.ComponentModel.DataAnnotations;

namespace ArukuNaati.Server.Models
{
    public class District
    {
        [Key]
        public int DistrictId { get; set; }

        public string DistrictName { get; set; }

        public int StateId { get; set; }
    }
}