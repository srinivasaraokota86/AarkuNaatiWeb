using ArukuNaati.Server.Data;
using ArukuNaati.Server.Services;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using FluentValidation;
using FluentValidation.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services
//builder.Services.AddControllers();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DB Context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// CORS for React 
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .AllowAnyOrigin());
});
builder.Services.AddScoped<EmailService>();
// Booking repository/service/unit-of-work registrations
builder.Services.AddScoped<ArukuNaati.Server.Repositories.IUnitOfWork, ArukuNaati.Server.Repositories.UnitOfWork>();
builder.Services.AddScoped<ArukuNaati.Server.Services.IBookingService, ArukuNaati.Server.Services.BookingService>();
builder.Services.AddScoped<ArukuNaati.Server.Services.IPilotService, ArukuNaati.Server.Services.PilotService>();

// AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

// FluentValidation
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<ArukuNaati.Server.Validators.CreateBookingDtoValidator>();

builder.Services.AddHttpClient();
builder.Services.AddScoped<AcumaticaService>();
builder.Services.AddScoped<AcumaticaVendorSyncService>();

builder.Services.AddHostedService<AcumaticaVendorBackgroundService>();
var app = builder.Build();


// Enable Swagger
app.UseSwagger();
    app.UseSwaggerUI();

// Enable CORS
app.UseCors("AllowAll");

app.UseHttpsRedirection();
// Routing
app.UseAuthorization();

app.MapControllers();

// Run application
app.Run();