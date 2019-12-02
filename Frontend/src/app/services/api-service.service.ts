import { Injectable } from '@angular/core';
import { HttpClient}    from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor(private http:HttpClient) { }

  registerUser(user){
  this.http.post('http://localhost:3000/register',user).subscribe(res =>{
    console.log(res);

  })
}

  public uploadAttachment(fd): Observable<any> {
    return this.http.post(`http://localhost:3000/attachment`, fd)
  }


  
}
