import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALIDATORS, Validators } from '@angular/forms';
import { EmployeeService } from '../../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../employee';

@Component({
  selector: 'app-assignreview',
  templateUrl: './assignreview.component.html',
  styleUrl: './assignreview.component.css'
})
export class AssignreviewComponent implements OnInit {
  employees :Employee[]= []; // Fetch employees from your service
  assignReviewersForm: FormGroup;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService,private router: Router,private route: ActivatedRoute) {
    this.assignReviewersForm = this.fb.group({
      username: ['', Validators.required],
      reviewers: [[], Validators.required]
    });
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if (params['username']) 
        { // Check for a specific parameter
      
        const username = params['username'];
  
        this.assignReviewersForm.get('username')?.setValue(username)
      }
    });
    
    this.employeeService.getEmployeeList().subscribe((data) => {
      this.employees = data;
    });







  }

  assignReviewers() {
    if (this.assignReviewersForm.valid) {
      const formValue = this.assignReviewersForm.value;
      this.employeeService.assignReviewers(formValue).subscribe({
        next: () => {
          alert('Reviewers assigned successfully');
          this.router.navigate(['/admin']);  // Navigate to admin panel on success
        },
        error: (err) => {
          console.error('Error assigning reviewers', err);
          alert('Failed to assign reviewers');
          this.router.navigate(['/admin']);  // Navigate to admin panel on error
        }

        
      });
    }
  }

  
  
}