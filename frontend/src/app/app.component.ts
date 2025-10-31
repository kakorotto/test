import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Frontend';
  apiResponse: any = null;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.testApi();
  }

  testApi() {
    this.loading = true;
    this.errorMessage = '';
    this.apiService.testConnection().subscribe({
      next: (response) => {
        this.apiResponse = response;
        this.loading = false;
        console.log('API Response:', response);
      },
      error: (error) => {
        this.errorMessage = `Error: ${error.message || 'Failed to connect to API'}`;
        this.loading = false;
        console.error('API Error:', error);
      }
    });
  }

  testHelloEndpoint(name: string) {
    this.loading = true;
    this.errorMessage = '';
    this.apiService.getHello(name).subscribe({
      next: (response) => {
        this.apiResponse = response;
        this.loading = false;
        console.log('Hello Response:', response);
      },
      error: (error) => {
        this.errorMessage = `Error: ${error.message || 'Failed to connect to API'}`;
        this.loading = false;
        console.error('API Error:', error);
      }
    });
  }

  testPostEndpoint() {
    this.loading = true;
    this.errorMessage = '';
    const testData = {
      name: 'Test User',
      message: 'This is a test message',
      timestamp: new Date().toISOString()
    };
    
    this.apiService.postData(testData).subscribe({
      next: (response) => {
        this.apiResponse = response;
        this.loading = false;
        console.log('Post Response:', response);
      },
      error: (error) => {
        this.errorMessage = `Error: ${error.message || 'Failed to connect to API'}`;
        this.loading = false;
        console.error('API Error:', error);
      }
    });
  }
}

