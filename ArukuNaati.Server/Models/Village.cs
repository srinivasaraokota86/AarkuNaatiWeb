using System.ComponentModel.DataAnnotations;

namespace ArukuNaati.Server.Models
{
    public class Village
    {
        [Key]
        public int VillageId { get; set; }

        public string VillageName { get; set; }

        public int MandalId { get; set; }
    }
}