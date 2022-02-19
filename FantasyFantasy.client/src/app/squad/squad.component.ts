import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../service/characters.service';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.scss'],
})
export class SquadComponent implements OnInit {
  constructor(private charactersService: CharactersService) {}

  ngOnInit(): void {}
}
