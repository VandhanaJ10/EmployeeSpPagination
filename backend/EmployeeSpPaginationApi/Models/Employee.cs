using System;

namespace EmployeeSpPaginationApi.Models

{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public DateTime JoinDate { get; set; }
        public string Status { get; set; }
    }
}