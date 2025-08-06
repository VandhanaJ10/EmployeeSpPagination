using EmployeeSpPaginationApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeSpPaginationApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // 👇 This connects your Employee model to the "EmployeeSpPagination" table in SQL Server
        public DbSet<Employee> EmployeeSpPagination { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Optional, but good practice: Set the table name explicitly
            modelBuilder.Entity<Employee>().ToTable("EmployeeSpPagination");
        }
    }
}
