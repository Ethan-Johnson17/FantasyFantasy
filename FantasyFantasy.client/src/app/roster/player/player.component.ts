import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../../Player';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { FPlayer } from 'src/app/FPlayer';

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
  @Input() player!: FPlayer;
  @Input() fas!: FPlayer;
  @Output() removePlayer: EventEmitter<FPlayer> = new EventEmitter();
  @Output() onToggleStarter: EventEmitter<FPlayer> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  releasePlayer(player: FPlayer) {
    this.removePlayer.emit(player);
  }

  onToggle(player: FPlayer) {
    this.onToggleStarter.emit(player);
    // this.player.starter === false
    //   ? (this.depthChart = true)
    //   : (this.depthChart = false);
  }
}
