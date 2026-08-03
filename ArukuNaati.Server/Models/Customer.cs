using System.ComponentModel.DataAnnotations;
namespace ArukuNaati.Server.Models
{
    public class Customer
    {
        [Key]

        public string CustomerId { get; set; }  // Auto generated number like C0001
            public string CustomerName { get; set; }
            public string CustomerClass { get; set; }
            public string Email { get; set; }
            public string Phone { get; set; }

            // Address fields
            public string AddressLine1 { get; set; }
            public string City { get; set; }
            public string State { get; set; }
            public string Country { get; set; }
            public string PostalCode { get; set; }
        

    }
}
