import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/app/Player';
import { MDCTextField } from '@material/textfield';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent implements OnInit {
  @Output() onAddPlayer: EventEmitter<Player> = new EventEmitter();
  player_name!: string;
  position!: string;
  jerseyNumber!: number;
  starter: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.player_name || !this.jerseyNumber || !this.position) {
      alert('Please add more information');
      return;
    }

    const newPlayer = {
      player_name: this.player_name,
      position: this.position,
      jerseyNumber: this.jerseyNumber,
      starter: this.starter,
    };

    this.onAddPlayer.emit(newPlayer);
    this.player_name = '';
    this.position = '';
    this.jerseyNumber = 0;
    this.starter = false;
  }
}
