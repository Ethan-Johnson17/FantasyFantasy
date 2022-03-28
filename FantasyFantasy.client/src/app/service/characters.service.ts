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
  private apiUrl = 'http://localhost:5000/api';
  private faApiUrl = 'http://localhost:5000/api/availablePlayers';

  constructor(private http: HttpClient) {}

  skillLevel(level: number) {
    return Math.floor(Math.random() * level) + 10;
  }
  createCharacter(fplayer: FPlayer, characterName: string) {
    let race;
    let characterClass;
    let level = 5;
    let team = fplayer.team;
    let stats = fplayer.stats;
    switch (fplayer.position) {
      case 'QB':
        race = 'Elf';
        if (team.includes('N')) {
          characterClass = 'Druid';
        } else {
          characterClass = 'Ranger';
        }
        level -= stats.passing.int;
        console.log('level', level);
        level += Math.floor(
          (stats.passing.passing_yds + stats.rushing.rushing_td) / 100
        );
        level += stats.passing.passing_td + stats.rushing.rushing_td;
        break;
      case 'WR':
        race = 'Human';
        if (team.includes('N')) {
          characterClass = 'Sorcerer';
        } else {
          characterClass = 'Paladin';
        }
        if (stats.receiving.receiving_yds) {
          level += Math.floor(
            (stats.receiving.receiving_yds + stats.rushing.rushing_td) / 100
          );
        }
        level += stats.receiving.receiving_td + stats.rushing.rushing_td;
        break;
      case 'RB':
        race = 'Dwarf';
        if (team.includes('N')) {
          characterClass = 'Cleric';
        } else {
          characterClass = 'Fighter';
        }
        if (stats.receiving.receiving_yds) {
          level += Math.floor(
            (stats.receiving.receiving_yds + stats.rushing.rushing_td) / 100
          );
        }
        level += stats.receiving.receiving_td + stats.rushing.rushing_td;
        break;
      case 'HB':
        race = 'Gnome';
        if (team.includes('N')) {
          characterClass = 'Rogue';
        } else {
          characterClass = 'Wizard';
        }
        if (stats.receiving.receiving_yds) {
          level += Math.floor(
            (stats.receiving.receiving_yds + stats.rushing.rushing_td) / 100
          );
        }
        level += stats.receiving.receiving_td + stats.rushing.rushing_td;
        break;
      case 'TE':
        race = 'HalfOrc';
        if (team.includes('N')) {
          characterClass = 'Fighter';
        } else {
          characterClass = 'Barbarian';
        }
        if (stats.receiving.receiving_yds) {
          level += Math.floor(
            (stats.receiving.receiving_yds + stats.rushing.rushing_td) / 100
          );
        }
        level += stats.receiving.receiving_td + stats.rushing.rushing_td;
        break;
      case 'DEF':
        race = 'Halfling';
        if (team.includes('N')) {
          characterClass = 'Ranger';
        } else {
          characterClass = 'Rogue';
        }
        level = 7;
        break;
    }
    let newCharacter = {
      race: race,
      class: characterClass,
      characterName: characterName,
      Strength: this.skillLevel(level),
      Dexterity: this.skillLevel(level),
      Constitution: this.skillLevel(level),
      Wisdom: this.skillLevel(level),
      Intelligence: this.skillLevel(level),
      Charisma: this.skillLevel(level),
      playerId: fplayer.id,
    };
    console.log(newCharacter);
    return this.http.post<Character>(
      this.apiUrl + '/characters',
      newCharacter,
      HttpOptions
    );
  }

  removeCharacter(character: Character): Observable<Character> {
    console.log(character);
    const url = `${this.apiUrl}/characters/${character.id}`;
    return this.http.delete<Character>(url);
  }
}
