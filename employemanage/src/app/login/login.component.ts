import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user={
    username:'',
    password:'',
  };
  
  loginForm: FormGroup;


  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router) {
    this.loginForm=new FormGroup({
      username: new FormControl('',[Validators.required,Validators.minLength(4)]),
        
        password: new FormControl('',[Validators.required,Validators.minLength(4)]),
        
      }
    
    );
    
  }
// onLogin() {
//     this.authService.login(this.username, this.password).subscribe(user => {
//       if (user) {
//         // If user is an admin, navigate to the admin dashboard
//         if (user.role === 'admin') {
//           this.router.navigate(['/admin']);
//         } else if (user.role === 'employee') {
//           // If user is an employee, navigate to the employee dashboard
//           this.router.navigate(['/employee']);
//         }
//       } else {
//         alert('Invalid login credentials');
//       }
//     });
//   }


  onLogin() {
    if (this.loginForm.valid) {

      this.authService.login(this.loginForm.get('username')?.value,this.loginForm.get("password")?.value).subscribe( (user) => {
          console.log(JSON.stringify(user));
          if (user) {
                    // If user is an admin, navigate to the admin dashboard
                    if (user.role === 'admin') {
                      this.router.navigate(['/admin']);
                    } else if (user.role === 'employee') {
                      // If user is an employee, navigate to the employee dashboard
                      this.router.navigate(['/employee']);
                    }
                  }
          else{
            alert("invalid Credentials")
            this.loginForm=new FormGroup({
              username: new FormControl('',[Validators.required,Validators.minLength(4)]),
                
                password: new FormControl('',[Validators.required,Validators.minLength(8)]),
                
              })
          }
        },
        (error) =>{
          console.log(error );
        }
      );
    } 
  }

  registerPage(){
    this.router.navigate(['/auth/register']);
  
  }
}
