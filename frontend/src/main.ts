import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: APP_BASE_HREF, useValue: '/test/' }
  ]
}).catch(err => console.error(err));

