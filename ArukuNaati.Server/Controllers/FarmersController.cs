using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArukuNaati.Server.Data;
using ArukuNaati.Server.Models;
using ArukuNaati.Server.DTOs;
using Azure;
using System;
using ArukuNaati.Server.Services;

namespace ArukuNaati.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FarmersController : ControllerBase
    {

          private readonly AppDbContext _context;

          public FarmersController(AppDbContext context)
          {
              _context = context;
          }

        /*ivate readonly AppDbContext _context;
        private readonly AcumaticaService _acumaticaService;

        public FarmersController(
            AppDbContext context,
            AcumaticaService acumaticaService)
        {
            _context = context;
            _acumaticaService = acumaticaService;
        }*/

        // Fix for CS1061: Correcting the DbSet name to match the property defined in AppDbContext
        /*  [HttpGet]
          public async Task<IActionResult> GetAll()
          {
              var data = await _context.Farmers.ToListAsync(); // Corrected 'farmer' to 'Farmers'
              return Ok(data);
          }*/

        [HttpGet]
        public async Task<IActionResult> GetAll(int page = 1, int pageSize = 20)
        {
            var totalRecords = await _context.Farmers.CountAsync();
            var farmers = await _context.Farmers
        .OrderBy(x => x.Name)
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
            //var data = await _context.Farmers
                .Select(f => new
                {
                    f.Id,
                    f.FarmerCode,
                    f.Name,
                    f.Mobile,
                    f.AadharNo,
                    f.GSTNO,
                    IsActive = f.ISActive,
                    f.CreatedDate,
                    Address = _context.FarmerAddresses.FirstOrDefault(a => a.FarmerId == f.Id),
                    Payment = _context.FarmerPayment.FirstOrDefault(a => a.FarmerId == f.Id),
                })
                .ToListAsync();

            var result = farmers.Select(f =>
            {
                var address = f.Address;
                var village = address?.VillageId != null ? _context.Villages.FirstOrDefault(v => v.VillageId == address.VillageId) : null;
                var mandal = address?.MandalId != null ? _context.Mandals.FirstOrDefault(m => m.MandalId == address.MandalId) : null;
                var district = address?.DistrictId != null ? _context.Districts.FirstOrDefault(d => d.DistrictId == address.DistrictId) : null;
                var state = address?.StateId != null ? _context.States.FirstOrDefault(s => s.StateId == address.StateId) : null;

                var payment = f.Payment;

                return new
                {
                    f.Id,
                    f.FarmerCode,
                    f.Name,
                    f.Mobile,
                    f.AadharNo,
                    f.GSTNO,
                    f.IsActive,
                    f.CreatedDate,

                    // IDs (needed for Edit screen dropdowns)
                    villageId = address?.VillageId,
                    mandalId = address?.MandalId,
                    districtId = address?.DistrictId,
                    stateId = address?.StateId,

                    // Display Names (needed for List screen)
                    villageName = village?.VillageName ?? "",
                    mandalName = mandal?.MandalName ?? "",
                    districtName = district?.DistrictName ?? "",
                    stateName = state?.StateName ?? "",

                    pinCode = address?.PinCode ?? "",
                    fullAddress = address?.FullAddress ?? "",

                    // Payment details
                    bank = payment?.Bank,
                    accountNo = payment?.AccountNo,
                    ifsc = payment?.IFSC,
                    amount = payment?.Amount,
                    paymentMethod = payment?.PaymentMethod,
                    referenceNo = payment?.ReferenceNo,
                    paymentDate = payment?.PaymentDate,
                    release = payment?.Release,

                };
            });

            //return Ok(result);
            return Ok(new
            {
                totalRecords,
                currentPage = page,
                pageSize,
                data = result
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterFarmer([FromBody]
    FarmerRegistrationDto dto)
        {
            try
            {
                // Duplicate Aadhaar Check
                if (await _context.Farmers
                    .AnyAsync(x =>
                        x.AadharNo == dto.Farmer.AadharNo))
                {
                    return BadRequest(new
                    {
                        message = "Aadhaar already exists"
                    });
                }

                // Generate Farmer Id
                dto.Farmer.Id =
                    "F" + DateTime.Now.Ticks
                    .ToString()
                    .Substring(10);

                _context.Farmers.Add(dto.Farmer);

                await _context.SaveChangesAsync();

                // Address
                dto.Address.FarmerId =
                    dto.Farmer.Id;

                _context.FarmerAddresses
                    .Add(dto.Address);
                //payment

                dto.Payment.FarmerId = dto.Farmer.Id;

                _context.FarmerPayment.Add(dto.Payment);


                // Land
                // dto.Land.FarmerId =
                //   dto.Farmer.Id;

                // _context.FarmerLands
                // .Add(dto.Land);

                // Crop
                //dto.Crop.FarmerId =
                // dto.Farmer.Id;

                //  _context.FarmerCrops
                //  .Add(dto.Crop);

                await _context.SaveChangesAsync();
                // Create Vendor in Acumatica
                //ait _acumaticaService.CreateVendor(dto.Farmer);

                return Ok(new
                 {
                    message =
                     "Farmer Registered Successfully"
                  });
                /*await _context.SaveChangesAsync();

                // Create Vendor in Acumatica
                await _acumaticaService.CreateVendor(dto.Farmer);

                return Ok(new
                {
                    message = "Farmer Registered Successfully"
                });*/

            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.InnerException?.Message ?? ex.Message
                });
            }
        }


        /* [HttpPut("{id}")]
         public async Task<IActionResult> PutFarmer(
     string id,
      Farmers farmer)
         {
             if (id != farmer.Id)
             {
                 return BadRequest();
             }

             _context.Entry(farmer).State = EntityState.Modified;

             await _context.SaveChangesAsync();

             return Ok(new
             {
                 message = "Farmer Updated Successfully"
             });
         }



         [HttpDelete("{id}")]
         public async Task<IActionResult> DeleteFarmer(string id)
         {
             var farmer = await _context.Farmers.FindAsync(id);

             if (farmer == null)
             {
                 return NotFound();
             }

             _context.Farmers.Remove(farmer);

             await _context.SaveChangesAsync();

             return Ok(new
             {
                 message = "Farmer Deleted Successfully"
             });
         }
     }*/

        // In FarmersController.cs

        [HttpPut("register/{id}")]
        public async Task<IActionResult> RegisterFarmer(string id, [FromBody] FarmerRegistrationDto dto)
        {
            try
            {
                // Update Farmer
                var farmer = await _context.Farmers.FindAsync(id);
                if (farmer == null)
                    return NotFound();

                farmer.FarmerCode = dto.Farmer.FarmerCode;
                farmer.Name = dto.Farmer.Name;
                farmer.Mobile = dto.Farmer.Mobile;
                farmer.AadharNo = dto.Farmer.AadharNo;
                farmer.GSTNO = dto.Farmer.GSTNO;
                farmer.ISActive = dto.Farmer.ISActive;
                farmer.CreatedDate = dto.Farmer.CreatedDate;

                // Update Address
                var address = await _context.FarmerAddresses.FirstOrDefaultAsync(a => a.FarmerId == id);
                if (address != null)
                {
                    address.VillageId = dto.Address.VillageId;
                    address.MandalId = dto.Address.MandalId;
                    address.DistrictId = dto.Address.DistrictId;
                    address.StateId = dto.Address.StateId;
                    address.PinCode = dto.Address.PinCode;
                    address.FullAddress = dto.Address.FullAddress;
                }
                var payment = await _context.FarmerPayment
                    .FirstOrDefaultAsync(x => x.FarmerId == id);

                if (payment != null)
                {
                    payment.Bank = dto.Payment.Bank;
                    payment.AccountNo = dto.Payment.AccountNo;
                    payment.IFSC = dto.Payment.IFSC;
                    payment.Amount = dto.Payment.Amount;
                    payment.PaymentMethod = dto.Payment.PaymentMethod;
                    payment.ReferenceNo = dto.Payment.ReferenceNo;
                    payment.PaymentDate = dto.Payment.PaymentDate;
                    payment.Release = dto.Payment.Release;
                }

                await _context.SaveChangesAsync();

                return Ok(new { message = "Farmer Registration Updated Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }


        [HttpDelete("register/{id}")]
        public async Task<IActionResult> DeleteFarmerRegistration(string id)
        {
            try
            {
                var payment = await _context.FarmerPayment
    .FirstOrDefaultAsync(x => x.FarmerId == id);

                if (payment != null)
                    _context.FarmerPayment.Remove(payment);

                var address = await _context.FarmerAddresses
                    .FirstOrDefaultAsync(x => x.FarmerId == id);

                if (address != null)
                    _context.FarmerAddresses.Remove(address);

                var farmer = await _context.Farmers.FindAsync(id);

                if (farmer != null)
                    _context.Farmers.Remove(farmer);

                await _context.SaveChangesAsync();
                return Ok(new { message = "Farmer Registration Deleted Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }
    }
}