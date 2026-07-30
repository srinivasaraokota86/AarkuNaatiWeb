using ArukuNaati.Server.Data;
using ArukuNaati.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ArukuNaati.Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LocationManagementController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LocationManagementController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetLocations()
        {
            var data =
                await (from v in _context.Villages
                       join m in _context.Mandals
                           on v.MandalId equals m.MandalId
                       join d in _context.Districts
                           on m.DistrictId equals d.DistrictId
                       join s in _context.States
                           on d.StateId equals s.StateId
                       select new
                       {
                           s.StateName,
                           d.DistrictName,
                           m.MandalName,
                           v.VillageName
                       }).ToListAsync();

            return Ok(data);
        }
    }
}
