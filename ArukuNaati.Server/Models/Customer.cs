namespace ArukuNaati.Server.Models
{
    public class Customer
    {
        
            public int Id { get; set; }
            public string CustomerID { get; set; }  // Auto generated number like C0001
            public string CustomerName { get; set; }
            public string CustomerClass { get; set; }
            public string Email { get; set; }
            public string Phone { get; set; }

            // Address fields
            public string AddressLine1 { get; set; }
            public string AddressLine2 { get; set; }
            public string City { get; set; }
            public string State { get; set; }
            public string Country { get; set; }
            public string PostalCode { get; set; }
        

    }
}
