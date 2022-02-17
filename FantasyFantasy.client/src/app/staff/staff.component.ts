import { Component, OnInit } from '@angular/core';
import { Coach } from '../Coach';
import { Coaches } from '../coaches-data';
import { CoachService } from '../service/coach.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  coaches: Coach[] = [];

  constructor(private coachService: CoachService) { }

  ngOnInit(): void {
    this.coachService.getCoaches().subscribe((coaches) => this.coaches = coaches)
  }

}
