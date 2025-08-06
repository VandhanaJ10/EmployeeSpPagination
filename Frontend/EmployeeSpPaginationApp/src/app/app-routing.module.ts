import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list';

const routes: Routes = [
  { path: '', component: EmployeeListComponent }, // default route
  { path: 'employees', component: EmployeeListComponent },
  // add other routes if needed, e.g.:
  // { path: 'add', component: AddEmployeeComponent },
  // { path: 'edit/:id', component: EditEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
