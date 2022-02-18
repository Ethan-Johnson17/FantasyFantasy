import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FPlayer } from '../FPlayer';
import * as fPlayersData from '../../../players.json';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class FantasyService {
  private defaultFantasyApiUrl =
    'https://www.fantasyfootballdatapros.com/api/players/2019/1';
  private fantasyApiUrl =
    'https://www.fantasyfootballdatapros.com/api/players/';
  private apiUrl = 'http://localhost:5000/api/fantasyTeam';
  private allFPUrl = 'http://localhost:5000/api/players';

  constructor(private http: HttpClient) {}

  getFantasyScores(): Observable<FPlayer[]> {
    const players = this.http.get<FPlayer[]>(this.defaultFantasyApiUrl);
    return players;
  }

  getAllFantasyPlayers(): Observable<FPlayer[]> {
    const players = this.http.get<FPlayer[]>(this.allFPUrl);
    return players;
  }

  getFantasyPlayersQuery(data: { year: number }) {
    const players = this.http.get<FPlayer[]>(
      this.fantasyApiUrl + `${data.year}/all`
    );
    console.log(players);
    return players;
  }

  addPlayer(fplayer: FPlayer) {
    const fTeam = this.http.post<FPlayer>(this.apiUrl, fplayer);
    return fTeam;
  }

  getFantasyTeam(): Observable<FPlayer[]> {
    return this.http.get<FPlayer[]>(this.apiUrl);
  }

  removePlayer(fplayer: FPlayer): Observable<FPlayer> {
    const url = `${this.apiUrl}/${fplayer.id}`;
    return this.http.delete<FPlayer>(url);
  }
}
