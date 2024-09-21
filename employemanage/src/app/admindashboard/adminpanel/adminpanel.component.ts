import { Component } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.css'
})
export class AdminpanelComponent {
   employeeList:Employee[]=[]
  constructor(private employeelistService:EmployeeService,private router: Router){
this.getEmployeeList();
  }
  getEmployeeList(){
this.employeelistService.getEmployeeList().subscribe(result=>{
  this.employeeList=result;
})

  }

  deleteEmployee(username: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeelistService.deleteEmployee(username).subscribe(() => {
        this.getEmployeeList(); // Refresh the employee list
      });
    }
  }

  editEmployee(employee: Employee) {
    this.router.navigate(['admin/edit-employee'], {
      queryParams: { employee: JSON.stringify(employee) } 
    });
  
  }

addNewEmployee(){
this.router.navigate((['/admin/add']))
}

}
