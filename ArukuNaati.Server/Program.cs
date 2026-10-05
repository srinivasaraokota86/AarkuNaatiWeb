using ArukuNaati.Server.Data;
using ArukuNaati.Server.Services;
using Microsoft.EntityFrameworkCore;

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
// Booking repository/service registrations
builder.Services.AddScoped<ArukuNaati.Server.Repositories.IBookingRepository, ArukuNaati.Server.Repositories.BookingRepository>();
builder.Services.AddScoped<ArukuNaati.Server.Services.IBookingService, ArukuNaati.Server.Services.BookingService>();

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