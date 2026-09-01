using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArukuNaati.Server.Data;
using ArukuNaati.Server.DTOs;
using ArukuNaati.Server.Models;

namespace ArukuNaati.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QualityInspectionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public QualityInspectionController(AppDbContext context)
        {
            _context = context;
        }

        // GET ALL
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QualityInspection>>> GetAllQualityInspections()
        {
            return await _context.QualityInspections
                .OrderByDescending(x => x.QualityInspectionId)
                .ToListAsync();
        }

        // GET BY ID
        [HttpGet("{id}")]
        public async Task<ActionResult<QualityInspection>> GetQualityInspection(int id)
        {
            var qualityInspection = await _context.QualityInspections.FindAsync(id);

            if (qualityInspection == null)
                return NotFound();

            return qualityInspection;
        }

        // SAVE
        [HttpPost]
        public async Task<IActionResult> SaveQualityInspection(QualityInspectionDto dto)
        {
            var qualityInspection = new QualityInspection
            {
                ProcurementId = dto.ProcurementId,
                Moisture = dto.Moisture,
                Size = dto.Size,
                Damage = dto.Damage,
                Color = dto.Color,
                Ripeness = dto.Ripeness,
                ForeignMaterial = dto.ForeignMaterial,
                QualityGrade = dto.QualityGrade,
                Inspector = dto.Inspector,
                CreatedDate = DateTime.Now
            };

            _context.QualityInspections.Add(qualityInspection);

            await _context.SaveChangesAsync();

            return Ok(qualityInspection);
        }

        // UPDATE
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQualityInspection(int id, QualityInspectionDto dto)
        {
            var qualityInspection = await _context.QualityInspections.FindAsync(id);

            if (qualityInspection == null)
                return NotFound();

            qualityInspection.ProcurementId = dto.ProcurementId;
            qualityInspection.Moisture = dto.Moisture;
            qualityInspection.Size = dto.Size;
            qualityInspection.Damage = dto.Damage;
            qualityInspection.Color = dto.Color;
            qualityInspection.Ripeness = dto.Ripeness;
            qualityInspection.ForeignMaterial = dto.ForeignMaterial;
            qualityInspection.QualityGrade = dto.QualityGrade;
            qualityInspection.Inspector = dto.Inspector;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Quality Inspection Updated Successfully"
            });
        }
        // DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQualityInspection(int id)
        {
            var qualityInspection = await _context.QualityInspections.FindAsync(id);

            if (qualityInspection == null)
                return NotFound();

            _context.QualityInspections.Remove(qualityInspection);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}