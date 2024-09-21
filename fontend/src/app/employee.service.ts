import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeurl="http://localhost:3000/employee/";

  employelist:Employee[]=[]
  constructor(private http: HttpClient) {}

  getEmployeeList():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.employeeurl+"getnames");
  }

  register(employee: any): Observable<any> {
    return this.http.post(this.employeeurl+"inserttnames", employee);
  }

  deleteEmployee(username: string): Observable<any> {
    return this.http.delete(`${this.employeeurl}deleteitem?username=${username}`);
  }
  updateEmployee(employee: Employee): Observable<any> {
    const url = `${this.employeeurl}updateitem?username=${employee.username}`;
    return this.http.put(url, employee);
  }
  
}
