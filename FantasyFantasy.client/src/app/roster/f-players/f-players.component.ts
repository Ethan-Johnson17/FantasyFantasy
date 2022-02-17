import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FPlayer } from '../../FPlayer';

@Component({
  selector: 'app-f-players',
  templateUrl: './f-players.component.html',
  styleUrls: ['./f-players.component.scss'],
})
export class FPlayersComponent implements OnInit {
  @Input() fplayer!: FPlayer;
  @Input() fas!: FPlayer;
  @Output() removeFPlayer: EventEmitter<FPlayer> = new EventEmitter();
  @Output() onToggleStarter: EventEmitter<FPlayer> = new EventEmitter();
  @Output() toggleFPlayer: EventEmitter<FPlayer> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onToggle(fplayer: FPlayer) {
    this.toggleFPlayer.emit(fplayer);
  }
}
