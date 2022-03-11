import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  opponents = [
    { team: 'Week 1: Cowboys', chapter: 'Chap. 1: Ambushed' },
    { team: 'Week 2: Giants', chapter: 'Chap. 2: The Cave' },
    { team: 'Week 3: Buccaneers', chapter: 'Chap. 3: Boss Fight' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
