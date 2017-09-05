import { Component, Inject } from '@angular/core';
import { Resume } from './models/resume.model';
import { ResumeResponse } from './models/resume-response.model';
import { Http, Response } from '@angular/http';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(@Inject(Resume) private resume:Resume, 
  @Inject(ResumeResponse) private resume_response:ResumeResponse, 
  private http:Http){

  }

  clearEmptyResumeParams(o) {
    for (var k in o) {
      if (!o[k] || typeof o[k] !== "object" || k === "person") {
        continue // If null or not an object, skip to the next iteration
      }
  
      // The property is an object
      this.clearEmptyResumeParams(o[k]); // <-- Make a recursive call on the nested object
      if (Object.keys(o[k]).length === 0) {
        delete o[k]; // The object had no properties, so delete that property
      }
    }
  }

  preview(){
    this.clearEmptyResumeParams(this.resume);
    console.log(JSON.stringify(this.resume));
    this.http.post(`${environment.host}${environment.resume_url}`, this.resume)
      .subscribe((response:Response) => {
        console.log(response.text());
        this.resume_response.setHtml(response.text());
      });
  }
}
