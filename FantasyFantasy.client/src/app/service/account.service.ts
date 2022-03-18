import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FPlayer } from '../FPlayer';
import { Character } from '../Character';
const HttpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:5000/account';

  constructor(private http: HttpClient) {}

  getMyPlayers(): Observable<FPlayer[]> {
    return this.http.get<FPlayer[]>(this.apiUrl + '/myplayers');
  }

  getMyCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl + '/mycharacters');
  }

  deletePlayer(player: FPlayer): Observable<FPlayer> {
    const url = `${this.apiUrl}/myplayers/${player.id}`;
    return this.http.delete<FPlayer>(url);
  }
}
