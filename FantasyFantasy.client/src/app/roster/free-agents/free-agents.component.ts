import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../../Player';

@Component({
  selector: 'app-free-agents',
  templateUrl: './free-agents.component.html',
  styleUrls: ['./free-agents.component.scss'],
})
export class FreeAgentsComponent implements OnInit {
  @Input() player!: Player;
  @Input() fas!: Player;
  @Output() removePlayer: EventEmitter<Player> = new EventEmitter();
  @Output() onToggleStarter: EventEmitter<Player> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
