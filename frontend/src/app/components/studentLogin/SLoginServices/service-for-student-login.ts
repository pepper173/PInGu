import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { student } from '../../../student';


@Injectable({
  providedIn: 'root'

})
export class serviceforStudentLogin{
  http = inject(HttpClient);

  getStudentData(){
    const url = 'https://jsonplaceholder.typicode.com/posts/1/comments' // URL zum Backend-Endpunkt
    console.log(this.http.get<Array<student>>(url));    
    return this.http.get<Array<student>>(url);
    
  }

}
