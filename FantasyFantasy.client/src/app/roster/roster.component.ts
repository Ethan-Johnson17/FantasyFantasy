import { Component, OnInit } from '@angular/core';
import { Player } from '../Player';
import { PlayerService } from '../service/player.service';
import { UiService } from '../service/ui.service';
import { Subscription } from 'rxjs';
import { FantasyService } from '../service/fantasy.service';
import { FPlayer } from '../FPlayer';
import * as fPlayersData from '../../../players.json';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss'],
})
export class RosterComponent implements OnInit {
  players: Player[] = [];
  fas: Player[] = [];
  fPlayers: FPlayer[] = [];
  fantasyTeam: FPlayer[] = [];
  showAddPlayer!: boolean;
  subscription!: Subscription;
  year!: number;
  week!: number;
  player_name!: string;
  playerPosition!: string;

  playerArray: any;

  constructor(
    private playerService: PlayerService,
    private uiService: UiService,
    private fantasyService: FantasyService
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddPlayer = value));
  }

  ngOnInit(): void {
    this.playerService
      .getPlayers()
      .subscribe((players) => (this.players = players));
    this.playerService
      .getAvailablePlayers()
      .subscribe((fas) => (this.fas = fas));
    this.fantasyService
      .getFantasyPlayers()
      .subscribe((fPlayers) => (this.fPlayers = fPlayers));
    this.fantasyService
      .getFantasyTeam()
      .subscribe((fantasyTeam) => (this.fantasyTeam = fantasyTeam));
  }

  // findPlayer(playerName: any) {
  //   const found = this.players.find((p) => p.playerName == playerName);
  //   if (found?.playerName == playerName) {
  //     console.log(true);
  //   }
  // }

  addPlayer(newPlayer: Player) {
    this.playerService
      .signPlayer(newPlayer)
      .subscribe((newPlayer) => this.players.push(newPlayer));
  }

  onRemovePlayer(player: Player) {
    this.playerService
      .deletePlayer(player)
      .subscribe(
        () => (this.players = this.players.filter((p) => p.id !== player.id))
      );
  }

  toggleStarter(player: Player) {
    player.starter = !player.starter;
    this.playerService.togglePlayer(player).subscribe();
  }

  toggleAddPlayer() {
    this.uiService.toggleAddPlayer();
  }

  onSubmit() {
    if (!this.year || !this.week) {
      alert('Please add more information');
      return;
    } else if (
      this.year < 1999 ||
      this.year > 2021 ||
      this.week < 1 ||
      this.week > 17
    ) {
      alert('invalid entry');
      return;
    }
    let data = { year: this.year, week: this.week };
    const search = this.fantasyService
      .getFantasyPlayersQuery(data)
      .subscribe((fPlayers) => (this.fPlayers = fPlayers));
  }

  addToTeam(fplayer: FPlayer) {
    this.fantasyService
      .addPlayer(fplayer)
      .subscribe((fplayer) => this.fantasyTeam.push(fplayer));
    console.log('fteam', this.fantasyTeam);
  }

  removeFromTeam(fplayer: FPlayer) {
    this.fantasyService
      .removePlayer(fplayer)
      .subscribe(
        () =>
          (this.fantasyTeam = this.fantasyTeam.filter(
            (p) => p.id !== fplayer.id
          ))
      );
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

  generate() {
    this.fantasyService
      .generatePlayers()
      .subscribe((p) => (this.playerArray = p));
  }
}
