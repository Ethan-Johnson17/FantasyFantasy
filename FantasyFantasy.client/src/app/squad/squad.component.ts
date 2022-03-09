import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Character } from '../Character';
import { AccountService } from '../service/account.service';
import { CharactersService } from '../service/characters.service';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.scss'],
})
export class SquadComponent implements OnInit {
  squad: Character[] = [];
  profileJson: string = '';

  constructor(
    private charactersService: CharactersService,
    private accountService: AccountService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );
    this.accountService
      .getMyCharacters()
      .subscribe((squad) => (this.squad = squad));
  }
}
