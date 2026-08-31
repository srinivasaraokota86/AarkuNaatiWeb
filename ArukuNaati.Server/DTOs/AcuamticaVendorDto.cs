using ArukuNaati.Server.Models;

namespace ArukuNaati.Server.Models
{
    public class AcumaticaField<T>
    {
        public T? Value { get; set; }
    }

    public class AcumaticaVendorDto
    {
        public AcumaticaField<string>? VendorID { get; set; }

        public AcumaticaField<string>? VendorName { get; set; }

        public AcumaticaField<string>? VendorClass { get; set; }
    }
}