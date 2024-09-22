import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/review';  // Replace with your backend URL if different

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
  assignReviewers(data: { username: string, reviewers: string[] }) {
    const requests = data.reviewers.map((reviewer: string) => {
      // Create the body for each reviewer
      console.log(" "+reviewer);
      const body = {
        username: data.username,   // Employee being reviewed
        reviewerName: reviewer     // Reviewer assigned
      };
  
      // Make a POST request for each reviewer
      return this.http.post(`${this.apiUrl}/assignrevewer`, body);
    });
  
    // Use forkJoin to execute all HTTP calls in parallel
    return forkJoin(requests);  // Returns an observable that emits the results of all POST requests
  }
  getEmployeeReviews(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviews/${username}`);
  }
  submitReview(review: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/submitreview/${review._id}`, review);
  }

}
