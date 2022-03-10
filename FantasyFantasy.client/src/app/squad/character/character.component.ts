import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Character } from '../../Character';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {
  @Input() character!: Character;
  @Output() toggleCharacter: EventEmitter<Character> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onToggle(character: Character) {
    this.toggleCharacter.emit(character);
  }
}
