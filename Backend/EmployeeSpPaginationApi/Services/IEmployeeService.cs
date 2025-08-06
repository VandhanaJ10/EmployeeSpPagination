using EmployeeSpPaginationApi.Models;
using System.Collections.Generic;

namespace EmployeeSpPaginationApi.Services
{
    public interface IEmployeeService
    {
        List<Employee> GetAllEmployees();
    }
}