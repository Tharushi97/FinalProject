import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VaccancyService {
  constructor(private http: HttpClient) { }

  public getAllVaccancies() {
    return this.http.get(`${environment.backendUrl}/positions`);
  }
}
