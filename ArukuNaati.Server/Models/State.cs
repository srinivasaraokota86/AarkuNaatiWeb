using System.ComponentModel.DataAnnotations;

namespace ArukuNaati.Server.Models
{
    public class State
    {
        [Key]
        public int StateId { get; set; }

        public string StateName { get; set; }
    }
}