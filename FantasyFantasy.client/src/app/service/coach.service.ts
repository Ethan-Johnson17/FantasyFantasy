import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coach } from '../Coach';

@Injectable({
  providedIn: 'root',
})
export class CoachService {
  private apiUrl = 'http://localhost:5000/api/coaches';

  constructor(private http: HttpClient) {}

  getCoaches(): Observable<Coach[]> {
    return this.http.get<Coach[]>(this.apiUrl);
  }
}
