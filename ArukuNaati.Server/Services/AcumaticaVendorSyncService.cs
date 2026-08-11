using Microsoft.EntityFrameworkCore;
using ArukuNaati.Server.Data;
using ArukuNaati.Server.Models;

namespace ArukuNaati.Server.Services
{
    public class AcumaticaVendorSyncService
    {
        private readonly AppDbContext _context;
        private readonly AcumaticaService _acumaticaService;

        public AcumaticaVendorSyncService(
            AppDbContext context,
            AcumaticaService acumaticaService)
        {
            _context = context;
            _acumaticaService = acumaticaService;
        }
        public async Task SyncNewVendors()
        {
            try
            {
                // Get all Vendors from Acumatica
                var vendors = await _acumaticaService.GetVendors();

                if (vendors == null || vendors.Count == 0)
                {
                    Console.WriteLine("No vendors found in Acumatica.");
                    return;
                }

                foreach (var vendor in vendors)
                {
                    // Get actual string values from Acumatica objects
                    string? vendorId = vendor.VendorID?.Value;
                    string? vendorName = vendor.VendorName?.Value;
                    string? vendorClass = vendor.VendorClass?.Value;

                    // Vendor ID is mandatory
                    if (string.IsNullOrWhiteSpace(vendorId))
                    {
                        Console.WriteLine("Vendor ID is empty. Skipping.");
                        continue;
                    }

                    // Check duplicate FarmerCode
                    bool alreadyExists = await _context.Farmers
                        .AnyAsync(f => f.FarmerCode == vendorId);

                    if (alreadyExists)
                    {
                        Console.WriteLine(
                            $"Vendor {vendorId} already exists as Farmer. Skipping.");

                        continue;
                    }

                    // Generate Farmer ID
                    string farmerId =
                        "F" + DateTime.Now.Ticks
                        .ToString()
                        .Substring(10);

                    // Create Farmer
                    var farmer = new Farmers
                    {
                        Id = farmerId,

                        // Acumatica Vendor ID → Farmer Code
                        FarmerCode = vendorId,

                        // Acumatica Vendor Name → Farmer Name
                        Name = vendorName ?? "",

                        // These fields are not coming from Acumatica Vendor
                        Mobile = "",
                        AadharNo = "",
                        GSTNO = "",

                        CreatedDate = DateTime.Now
                    };

                    _context.Farmers.Add(farmer);

                    Console.WriteLine(
                        $"New Farmer created from Acumatica Vendor: {vendorId}");
                }

                await _context.SaveChangesAsync();

                Console.WriteLine(
                    "Vendor synchronization completed successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine(
                    "Vendor synchronization error: " + ex.Message);

                if (ex.InnerException != null)
                {
                    Console.WriteLine(
                        "Inner Exception: " + ex.InnerException.Message);
                }
            }
        }
    }
}