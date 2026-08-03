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

//ilder.Services.AddHttpClient();
//ilder.Services.AddScoped<AcumaticaService>();

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