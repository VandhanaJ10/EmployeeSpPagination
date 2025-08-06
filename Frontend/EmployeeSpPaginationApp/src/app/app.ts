import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<app-employee-list></app-employee-list>`,
  templateUrl: './app.html',
  styleUrl: './app.css',standalone:false
})
export class App {
  protected readonly title = signal('EmployeeSpPaginationApp');
}
