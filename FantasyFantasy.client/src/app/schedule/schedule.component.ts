import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  opponents = [
    'Week 1: Cowboys',
    'Week 2: Giants',
    'Week 3: Buccaneers',
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
