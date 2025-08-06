using EmployeeSpPaginationApi.Data;
using EmployeeSpPaginationApi.Services; // ✅ Import your service namespace
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// ✅ Add Connection String from appsettings.json
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ✅ Register your EmployeeService and its interface
builder.Services.AddScoped<IEmployeeService, EmployeeService>();

// ✅ Add CORS for Angular frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200") // frontend URL
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Add controller services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable Swagger in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable CORS
app.UseCors("AllowAngularApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
