import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css'],standalone:false
})
export class EmployeeListComponent implements OnInit {
  allEmployees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  pagedData: Employee[] = [];

  searchText: string = '';
  selectedEmployees: Set<number> = new Set();

  // Pagination
  pageSize = 5;
  pageIndex = 0;
  totalPages = 0;

  displayedColumns: string[] = ['select', 'id', 'name', 'role', 'joinDate', 'status', 'actions'];

  form: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      role: ['', Validators.required],
      joinDate: ['', Validators.required],
      status: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.allEmployees = data;
        this.applyFilter();
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      },
    });
  }

  applyFilter(): void {
    const term = this.searchText.toLowerCase().trim();
    this.filteredEmployees = this.allEmployees.filter(emp =>
      emp.name.toLowerCase().includes(term) ||
      emp.role.toLowerCase().includes(term)
    );
    this.pageIndex = 0;
    this.updatePagedData();
  }

  updatePagedData(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.filteredEmployees.slice(start, end);
    this.totalPages = Math.ceil(this.filteredEmployees.length / this.pageSize);
  }

  nextPage(): void {
    if (this.pageIndex + 1 < this.totalPages) {
      this.pageIndex++;
      this.updatePagedData();
    }
  }

  previousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.updatePagedData();
    }
  }

  toggleSelection(employee: Employee): void {
    if (this.selectedEmployees.has(employee.id)) {
      this.selectedEmployees.delete(employee.id);
    } else {
      this.selectedEmployees.add(employee.id);
    }
  }

  isSelected(employee: Employee): boolean {
    return this.selectedEmployees.has(employee.id);
  }

  toggleAllSelection(event: any): void {
    if (event.checked) {
      this.pagedData.forEach(emp => this.selectedEmployees.add(emp.id));
    } else {
      this.pagedData.forEach(emp => this.selectedEmployees.delete(emp.id));
    }
  }

  isAllSelected(): boolean {
    return this.pagedData.every(emp => this.selectedEmployees.has(emp.id));
  }

  isIndeterminate(): boolean {
    const selectedCount = this.pagedData.filter(emp => this.selectedEmployees.has(emp.id)).length;
    return selectedCount > 0 && selectedCount < this.pagedData.length;
  }

  exportToExcel(): void {
    const selected = this.allEmployees.filter(emp => this.selectedEmployees.has(emp.id));
    if (selected.length === 0) {
      alert("No employees selected!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(selected);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    XLSX.writeFile(workbook, "SelectedEmployees.xlsx");
  }

  // -------------------------
  // ✅ CRUD Functions
  // -------------------------

  onSubmit(): void {
    if (this.form.invalid) return;

    const employeeData: Employee = this.form.value;

    if (this.isEditMode) {
      this.employeeService.updateEmployee(employeeData).subscribe({
        next: () => {
          alert('Employee updated successfully');
          this.resetForm();
          this.fetchEmployees(); // ✅ Refresh after update
        },
        error: (err) => {
          console.error('Error updating employee:', err);
        },
      });
    } else {
      this.employeeService.createEmployee(employeeData).subscribe({
        next: () => {
          alert('Employee added successfully');
          this.resetForm();
          this.fetchEmployees(); // ✅ Refresh after add
        },
        error: (err) => {
          console.error('Error adding employee:', err);
        },
      });
    }
  }

  editEmployee(emp: Employee): void {
    this.form.patchValue(emp);
    this.isEditMode = true;
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          alert('Employee deleted successfully');
          this.fetchEmployees(); // ✅ Refresh after delete
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
        },
      });
    }
  }

  resetForm(): void {
    this.form.reset({
      id: 0,
      name: '',
      role: '',
      joinDate: '',
      status: 0
    });
    this.isEditMode = false;
  }
}
