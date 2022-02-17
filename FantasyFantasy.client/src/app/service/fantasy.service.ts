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
  private testapiUrl = 'http://localhost:5000/api/players/all';

  constructor(private http: HttpClient) {}

  getFantasyPlayers(): Observable<FPlayer[]> {
    const players = this.http.get<FPlayer[]>(this.defaultFantasyApiUrl);
    return players;
  }

  getFantasyPlayersQuery(data: { year: number; week: number }) {
    const players = this.http.get<FPlayer[]>(
      this.fantasyApiUrl + `${data.year}/${data.week}`
    );
    console.log(players);
    return players;
  }

  addPlayer(fplayer: FPlayer) {
    const fTeam = this.http.post<FPlayer>(this.apiUrl, fplayer);
    return fTeam;
  }

  generatePlayers() {
    const generated = this.http.post(this.testapiUrl, fPlayersData);
    console.log(generated);
    return generated;
  }
  // generatePlayers() {
  //   let gfPlayers = [];
  //   gfPlayers = Players;
  //   gfPlayers.forEach((p) => {
  //     const fTeam = this.http.post(this.testapiUrl, p);
  //     console.log(p.position);
  //     return fTeam;
  //   });
  // }

  getFantasyTeam(): Observable<FPlayer[]> {
    return this.http.get<FPlayer[]>(this.apiUrl);
  }

  removePlayer(fplayer: FPlayer): Observable<FPlayer> {
    const url = `${this.apiUrl}/${fplayer.id}`;
    return this.http.delete<FPlayer>(url);
  }
}
