import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-employepanel',
  templateUrl: './employepanel.component.html',
  styleUrl: './employepanel.component.css'
})
export class EmployepanelComponent implements OnInit {
  reviews: any[] = [];
  username: string='';

  constructor(private reviewService: EmployeeService, private authService: AuthService) {}

  ngOnInit(): void {
    // Get the logged-in employee's username from AuthService
    this.username = this.authService.getLoggedInUsername();

    // Fetch the reviews assigned to this employee
    this.reviewService.getEmployeeReviews(this.username).subscribe(
      (response) => {
        this.reviews = response;
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }
  submitReview(review: any): void {
    if (review.tempReview.trim()) {
      const updatedReview = {
        ...review,
        review: review.tempReview,  // Update the review field with the user's input
        status: 'Completed'
      };

      // Send the updated review to the backend
      this.reviewService.submitReview(updatedReview).subscribe(
        () => {
          review.review = review.tempReview;  // Update the review in the UI
          alert('Review submitted successfully');
        },
        (error) => {
          console.error('Error submitting review:', error);
        }
      );
    } else {
      alert('Please write a review before submitting.');
    }
  }
}
