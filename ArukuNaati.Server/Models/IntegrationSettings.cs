using System.ComponentModel.DataAnnotations;

namespace ArukuNaati.Server.Models
{
    public class IntegrationSettings
    {
        [Key]
        public int Id { get; set; }

        public string BaseUrl { get; set; }

        public string UserName { get; set; }
        public string Password { get; set; }
        public string EndpointName { get; set; }
        public string EndpointVersion { get; set; }
        public string SecretKey { get; set; }

        public bool IsActive { get; set; } = true;



    }
}
