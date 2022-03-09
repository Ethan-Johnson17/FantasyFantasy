import { Injectable } from '@angular/core';
import { Player } from '../Player';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FPlayer } from '../FPlayer';
import { Race } from '../playerEnum';
import { Character } from '../Character';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private apiUrl = 'http://localhost:5000/api/';
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
    return this.http.post<Player>(this.apiUrl + 'players', player, HttpOptions);
  }
  createCharacter(fplayer: FPlayer) {
    let race;
    let characterClass;
    let team = fplayer.team;
    switch (fplayer.position) {
      case 'QB':
        race = 'Elf';
        if (team.includes('N')) {
          characterClass = 'Druid';
        } else {
          characterClass = 'Ranger';
        }
        break;
      case 'WR':
        race = 'Human';
        if (team.includes('N')) {
          characterClass = 'Sorcerer';
        } else {
          characterClass = 'Paladin';
        }
        break;
      case 'RB':
        race = 'Dwarf';
        if (team.includes('N')) {
          characterClass = 'Cleric';
        } else {
          characterClass = 'Fighter';
        }
        break;
      case 'HB':
        race = 'Gnome';
        if (team.includes('N')) {
          characterClass = 'Rogue';
        } else {
          characterClass = 'Wizard';
        }
        break;
      case 'TE':
        race = 'HalfOrc';
        if (team.includes('N')) {
          characterClass = 'Fighter';
        } else {
          characterClass = 'Barbarian';
        }
        break;
      case 'DEF':
        race = 'Halfling';
        if (team.includes('N')) {
          characterClass = 'Ranger';
        } else {
          characterClass = 'Rogue';
        }
        break;
    }
    let newCharacter = { race: `${race}`, class: `${characterClass}` };
    return this.http.post<Character>(
      this.apiUrl + 'characters',
      newCharacter,
      HttpOptions
    );
  }
}
