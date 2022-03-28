import { Component, OnInit } from '@angular/core';
import { Player } from '../Player';
import { CharactersService } from '../service/characters.service';
import { UiService } from '../service/ui.service';
import { Subscription } from 'rxjs';
import { PlayersService } from '../service/players.service';
import { FPlayer } from '../FPlayer';
import * as fPlayersData from '../../../players.json';
import { AccountService } from '../service/account.service';
import { AuthService } from '@auth0/auth0-angular';
import { Account } from '../Account';
import { Character } from '../Character';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss'],
})
export class RosterComponent implements OnInit {
  players: FPlayer[] = [];
  availablePlayers: FPlayer[] = [];
  fPlayers: FPlayer[] = [];
  fantasyTeam: FPlayer[] = [];
  squad: Character[] = [];
  character!: Character;
  player!: FPlayer;
  showAddPlayer!: boolean;
  subscription!: Subscription;
  year!: number;
  week!: number;
  characterName!: string;
  player_name!: string;
  playerPosition!: string;
  profileJson: string = '';

  constructor(
    private playersService: PlayersService,
    public authService: AuthService,
    private accountService: AccountService,
    private uiService: UiService,
    private charactersService: CharactersService
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddPlayer = value));
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );
    // this.playersService
    //   .getPlayers()
    //   .subscribe((players) => (this.players = players));
    // this.playersService
    //   .getAvailablePlayers()
    //   .subscribe((fas) => (this.fas = fas));
    // this.playersService
    //   .getFantasyScores()
    //   .subscribe((players) => (this.fPlayers = players));
    this.accountService
      .getMyPlayers()
      .subscribe((fantasyTeam) => (this.fantasyTeam = fantasyTeam));
    this.accountService
      .getMyCharacters()
      .subscribe((squad) => (this.squad = squad));
  }

  toggleStarter(player: FPlayer) {
    player.starter = !player.starter;
    this.playersService.togglePlayer(player).subscribe();
  }

  toggleAddPlayer() {
    this.uiService.toggleAddPlayer();
  }

  closePopup() {
    this.displayStyle = 'none';
  }
  displayStyle = 'none';

  addToTeam(fplayer: FPlayer) {
    this.playersService
      .addPlayer(fplayer)
      .subscribe((fplayer) => this.fantasyTeam.push(fplayer));
    this.displayStyle = 'block';
    this.player = fplayer;
    console.log('team', this.fantasyTeam, 'squad', this.squad);
  }

  // FIXME This still doesn't remove character at the same time and it requires refresh.
  removeFromTeam(fplayer: FPlayer) {
    this.playersService
      .removePlayer(fplayer)
      .subscribe(
        () =>
          (this.fantasyTeam = this.fantasyTeam.filter(
            (p) => p.id !== fplayer.id
          ))
      );
    let found = this.squad.find((c) => c.playerId === fplayer.id);
    console.log('found', found, this.squad);
    if (found) {
      this.charactersService
        .removeCharacter(found)
        .subscribe(
          () =>
            (this.squad = this.squad.filter((c) => c.playerId !== fplayer.id))
        );
    }
  }

  async dateSelection() {
    if (!this.year || !this.week) {
      alert('Please add more information');
      return;
    } else if (this.year < 1999 || this.year > 2019) {
      alert('invalid entry');
      return;
    }
    let data = { year: this.year, week: this.week };
    return await this.playersService
      .getFantasyPlayersQuery(data)
      .subscribe((p) => (this.fPlayers = p));
  }

  nameCharacter() {
    this.charactersService
      .createCharacter(this.player, this.characterName)
      .subscribe((character) => this.squad.push(character));
    this.displayStyle = 'none';
    console.log(this.player);
    let newCharacter = this.squad.find((c) => c.playerId === this.player.id);
    if (newCharacter) {
      this.player.characterId = newCharacter.id;
      this.playersService.addId(this.player);
    }
  }

  filterPlayers() {
    const position = this.playerPosition;
    const name = this.player_name;
    if (position != 'Position' && name) {
      // Name and postion combined
      const nameAndPositionFilter = this.fPlayers.filter((fp) =>
        fp.player_name.includes(name)
      );
      this.fPlayers = nameAndPositionFilter;
      const filter = this.fPlayers.filter((fp) => fp.position == position);
      this.fPlayers = filter;
    } else if (position && !name) {
      // Position only
      const positionFilter = this.fPlayers.filter(
        (fp) => fp.position == position
      );
      this.fPlayers = positionFilter;
    } else if (!position && name) {
      // Name only
      const nameFilter = this.fPlayers.filter((fp) => fp.player_name == name);
      this.fPlayers = nameFilter;
    }
  }
}
