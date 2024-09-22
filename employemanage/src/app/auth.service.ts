import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUser: any = null;  // Simulated user object
 userurl="http://localhost:3000/users/getusers";
  
users:any[]=[];
constructor(private http: HttpClient) {
this.returnuserLIst()
}
  login(username: string, password: string): Observable<any> {
    // Mock API call: replace with real API integration
    const mockUsers =this.users;

    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));  // Store user info in localStorage
      this.loggedInUser = user;
    }
    return of(user);

  }

  isAuthenticated(): boolean {
    // Check if user is logged in, typically using a token or session storage
    return !!localStorage.getItem('user');
  }

  getUserRole(): string | null {
    // Retrieve user role from session/local storage after login
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.role || null;
  }

  getuserList():Observable<any[]>{
    return this.http.get<any[]>(this.userurl)

  }

returnuserLIst(){
  this.getuserList().subscribe(users=>{
    if(users){
      this.users=users
    }
  });

}

getLoggedInUsername(): string  {
  // Retrieve user role from session/local storage after login
  const user = JSON.parse(localStorage.getItem('user') || '');
  return user?.username || '';
}
}
