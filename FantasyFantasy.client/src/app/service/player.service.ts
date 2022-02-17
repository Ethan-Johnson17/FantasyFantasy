import { Injectable } from '@angular/core';
import { Player } from '../Player';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private apiUrl = 'http://localhost:5000/api/players';
  private faApiUrl = 'http://localhost:5000/api/availablePlayers';

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiUrl);
  }
  getAvailablePlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.faApiUrl);
  }

  deletePlayer(player: Player): Observable<Player> {
    const url = `${this.apiUrl}/${player?.id}`;
    return this.http.delete<Player>(url);
  }

  togglePlayer(player: Player): Observable<Player> {
    const url = `${this.apiUrl}/${player?.id}`;
    return this.http.put<Player>(url, player, HttpOptions);
  }

  signPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.apiUrl, player, HttpOptions);
  }
}
