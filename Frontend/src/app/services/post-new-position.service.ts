import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewPosition } from '../modelClasses/new-position';

@Injectable({
  providedIn: 'root'
})
export class PostNewPositionService {

url='http://localhost:3000/addPosition';

  constructor(private http:HttpClient) { }

  postNewPosition(position:NewPosition){
   return this.http.post<any>(this.url,position);
  }
}
