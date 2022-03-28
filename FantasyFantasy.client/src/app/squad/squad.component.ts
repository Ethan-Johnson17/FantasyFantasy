import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Character } from '../Character';
import { FPlayer } from '../FPlayer';
import { AccountService } from '../service/account.service';
import { CharactersService } from '../service/characters.service';
import { PlayersService } from '../service/players.service';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.scss'],
})
export class SquadComponent implements OnInit {
  squad: Character[] = [];
  fantasyTeam: FPlayer[] = [];

  profileJson: string = '';

  constructor(
    private charactersService: CharactersService,
    private accountService: AccountService,
    public authService: AuthService,
    public playersService: PlayersService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );
    this.accountService
      .getMyCharacters()
      .subscribe((squad) => (this.squad = squad));
    this.accountService
      .getMyPlayers()
      .subscribe((fantasyTeam) => (this.fantasyTeam = fantasyTeam));
  }

  activateCharacter(character: Character) {}

  removeCharacter(character: Character) {
    this.charactersService
      .removeCharacter(character)
      .subscribe(
        () => (this.squad = this.squad.filter((c) => c.id !== character.id))
      );

    let found = this.fantasyTeam.find((p) => p.id === character.playerId);
    console.log('hitting1');
    if (found) {
      this.playersService
        .removePlayer(found)
        .subscribe(
          () =>
            (this.fantasyTeam = this.fantasyTeam.filter(
              (p) => p.id !== found?.id
            ))
        );
    }
  }
}
