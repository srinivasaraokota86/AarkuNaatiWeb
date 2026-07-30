using System.ComponentModel.DataAnnotations;

namespace ArukuNaati.Server.Models
{
    public class Mandal
    {
        [Key]
        public int MandalId { get; set; }

        public string MandalName { get; set; }

        public int DistrictId { get; set; }
    }
}