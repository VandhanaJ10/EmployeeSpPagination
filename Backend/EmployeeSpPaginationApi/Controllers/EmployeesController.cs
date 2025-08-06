using EmployeeSpPaginationApi.Data; // ✅ Add this
using EmployeeSpPaginationApi.Models;
using EmployeeSpPaginationApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class EmployeesController : ControllerBase
{
    private readonly IEmployeeService _service;
    private readonly AppDbContext _context;

    public EmployeesController(IEmployeeService service, AppDbContext context)
    {
        _service = service;
        _context = context;
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddEmployee(Employee emp)
    {
        await _context.Database.ExecuteSqlRawAsync(
            "EXEC InsertEmployee @p0, @p1, @p2, @p3",
            emp.Name, emp.Role, emp.JoinDate, emp.Status
        );
        return Ok();
    }

    [HttpPut("update")]
    public async Task<IActionResult> UpdateEmployee(Employee emp)
    {
        await _context.Database.ExecuteSqlRawAsync(
            "EXEC UpdateEmployee @p0, @p1, @p2, @p3, @p4",
            emp.Id, emp.Name, emp.Role, emp.JoinDate, emp.Status
        );
        return Ok();
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
        await _context.Database.ExecuteSqlRawAsync("EXEC DeleteEmployee @p0", id);
        return Ok();
    }

    [HttpGet]
    public IActionResult GetAllEmployees()
    {
        return Ok(_service.GetAllEmployees());
    }
}
