import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../../Player';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations: [
    trigger('first', [
      state('false', style({ 'background-color': 'rgb(24, 24, 24)' })),
      state('true', style({ 'background-color': 'rgb(1, 85, 81)' })),
      transition('false => true', animate(500)),
    ]),
  ],
})
export class PlayerComponent implements OnInit {
  @Input() player!: Player;
  @Input() fas!: Player;
  @Output() removePlayer: EventEmitter<Player> = new EventEmitter();
  @Output() onToggleStarter: EventEmitter<Player> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  releasePlayer(player: Player) {
    this.removePlayer.emit(player);
  }

  onToggle(player: Player) {
    this.onToggleStarter.emit(player);
    // this.player.starter === false
    //   ? (this.depthChart = true)
    //   : (this.depthChart = false);
  }
}
