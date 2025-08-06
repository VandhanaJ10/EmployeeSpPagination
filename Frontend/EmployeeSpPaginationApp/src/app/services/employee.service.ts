import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:55344'; // Adjust if needed

     constructor(private http: HttpClient) {}

  // ✅ GET all employees
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/api/employees`);
  }

  // ✅ CREATE employee
  createEmployee(emp: Employee): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/employees/add`, emp);
  }

  // ✅ UPDATE employee
  updateEmployee(emp: Employee): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/employees/update`, emp);
  }

  // ✅ DELETE employee
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/employees/delete/${id}`);
  }

}
