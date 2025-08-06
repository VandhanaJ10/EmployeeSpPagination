using EmployeeSpPaginationApi.Data;
using EmployeeSpPaginationApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace EmployeeSpPaginationApi.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly AppDbContext _context;

        public EmployeeService(AppDbContext context)
        {
            _context = context;
        }

        public List<Employee> GetAllEmployees()
        {
            // Fetch from database, not dummy
            return _context.EmployeeSpPagination.ToList();
        }
    }
}
