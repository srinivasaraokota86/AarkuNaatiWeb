using System.ComponentModel.DataAnnotations;

namespace ArukuNaati.Server.Models
{
    public class Equipment
    {
        public int Id { get; set; }
        public string EquipmentName { get; set; }
        public decimal Price { get; set; }

        public string EquipmentNumber { get; set; }


    }
}
