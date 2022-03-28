import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FPlayer } from '../FPlayer';
import * as fPlayersData from '../../../players.json';
import { environment as env } from 'src/environments/environment';

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
  private url = `${env.dev.serverUrl.serverUrl}/api/players`;
  private teamUrl = 'http://localhost:5000/api/fantasyTeam';

  constructor(private http: HttpClient) {}

  getFantasyScores(): Observable<FPlayer[]> {
    const players = this.http.get<FPlayer[]>(this.defaultFantasyApiUrl);
    return players;
  }

  getAllFantasyPlayers(): Observable<FPlayer[]> {
    const players = this.http.get<FPlayer[]>(this.url);
    return players;
  }

  getFantasyPlayersQuery(data: { year: number; week: number }) {
    const players = this.http.get<FPlayer[]>(
      this.fantasyApiUrl + `${data.year}/${data.week}`
    );
    return players;
  }

  addPlayer(fplayer: FPlayer) {
    const fTeam = this.http.post<FPlayer>(this.url, fplayer);
    return fTeam;
  }

  removePlayer(fplayer: FPlayer): Observable<FPlayer> {
    const url = `${this.url}/${fplayer.id}`;
    return this.http.delete<FPlayer>(url);
  }

  togglePlayer(player: FPlayer): Observable<FPlayer> {
    const url = `${this.teamUrl}/${player?.id}`;
    return this.http.put<FPlayer>(url, player, HttpOptions);
  }

  signPlayer(player: FPlayer): Observable<FPlayer> {
    return this.http.post<FPlayer>(this.teamUrl, player, HttpOptions);
  }

  addId(fplayer: FPlayer): Observable<FPlayer> {
    return this.http.put<FPlayer>(this.url, fplayer, HttpOptions);
  }
}
