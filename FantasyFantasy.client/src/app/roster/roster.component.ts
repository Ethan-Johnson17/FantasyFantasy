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
  }

  // findPlayer(playerName: any) {
  //   const found = this.players.find((p) => p.playerName == playerName);
  //   if (found?.playerName == playerName) {
  //   }
  // }

  // addPlayer(newPlayer: Player) {
  //   this.playerService
  //     .signPlayer(newPlayer)
  //     .subscribe((newPlayer) => this.players.push(newPlayer));
  // }

  onRemovePlayer(player: FPlayer) {
    this.playersService
      .deletePlayer(player)
      .subscribe(
        () => (this.players = this.players.filter((p) => p.id !== player.id))
      );
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
  }

  removeFromTeam(fplayer: FPlayer) {
    this.playersService
      .removePlayer(fplayer)
      .subscribe(
        () =>
          (this.fantasyTeam = this.fantasyTeam.filter(
            (p) => p.id !== fplayer.id
          ))
      );
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
