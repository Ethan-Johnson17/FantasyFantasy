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
export class PlayersService {
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

  getFantasyPlayersQuery(data: { year: number; week: number }) {
    const players = this.http.get<FPlayer[]>(
      this.fantasyApiUrl + `${data.year}/${data.week}`
    );
    return players;
  }

  addPlayer(fplayer: FPlayer) {
    const fTeam = this.http.post<FPlayer>(this.allFPUrl, fplayer);
    return fTeam;
  }

  removePlayer(fplayer: FPlayer): Observable<FPlayer> {
    const url = `${this.apiUrl}/${fplayer.id}`;
    return this.http.delete<FPlayer>(url);
  }

  deletePlayer(player: FPlayer): Observable<FPlayer> {
    const url = `${this.apiUrl}/${player?.id}`;
    return this.http.delete<FPlayer>(url);
  }

  togglePlayer(player: FPlayer): Observable<FPlayer> {
    const url = `${this.apiUrl}/${player?.id}`;
    return this.http.put<FPlayer>(url, player, HttpOptions);
  }

  signPlayer(player: FPlayer): Observable<FPlayer> {
    return this.http.post<FPlayer>(this.apiUrl, player, HttpOptions);
  }
}
