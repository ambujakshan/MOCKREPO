import { Component, OnInit } from '@angular/core';
import { Employee } from '../../employee';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-addnewwmploye',
  templateUrl: './addnewwmploye.component.html',
  styleUrl: './addnewwmploye.component.css'
})
export class AddnewwmployeComponent implements OnInit {

  isEditing = false;

employee:Employee={
  name:'',
  department:'',
  age:0,
  place:'',
  active:true,
  username:''
};



registerForm: FormGroup;

constructor(private fb: FormBuilder,private employeeService: EmployeeService, private router: Router,private route: ActivatedRoute) {
  this.registerForm =new FormGroup({
    name:   new FormControl( '', [Validators.required,Validators.minLength(4)]),
    department:   new FormControl( '', [Validators.required,Validators.minLength(4)]),
    place:   new FormControl( '', [Validators.required,Validators.minLength(4)]),

    age:   new FormControl( 0, [Validators.required,Validators.min(18) ]),
    username:   new FormControl( '', [Validators.required,Validators.minLength(4)]),
    active:new FormControl(true)
  });
}
ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    console.log(params['employee']);
    if (params['employee']) 
      { // Check for a specific parameter
      this.isEditing = true;
      const employee = JSON.parse(params['employee']);

      this.registerForm.patchValue(employee); // Populate form with employee data
    } else {
      this.isEditing = false; // Reset to false if no params
    }
  });

}



onRegister():void {
  if (this.registerForm.valid) {
    console.log(this.registerForm.value);
    const formDataWithActive = Object.assign({}, this.registerForm.value, { active: true });
    this.employeeService.register(formDataWithActive).subscribe({
      next: (result) => {
        console.log('Registration successful:', result);
        this.router.navigate(['/admin']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 409) {
          alert('Duplicate entry: ' + error.error.message);
        } else {
          console.error('Error occurred during registration:', error.message);
          alert('An unexpected error occurred. Please try again.');
        }
      }
    });

  }
}


updateEmployee(): void {
  this.employeeService.updateEmployee(this.registerForm.value).subscribe({
    next: (result) => {
      console.log('Update successful:', result);
      this.router.navigate(['/admin']);
    },
    error: (error: HttpErrorResponse) => {
      console.error('Error during update:', error.message);
      alert('An unexpected error occurred. Please try again.');
    }
  });
}

}
