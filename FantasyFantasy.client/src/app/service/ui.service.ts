import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddPlayer: boolean = false;
  private subject = new Subject<any>()

  constructor() { }

  toggleAddPlayer(): void {
    this.showAddPlayer = !this.showAddPlayer
    this.subject.next(this.showAddPlayer)
  }

  onToggle(): Observable<any>{
    return this.subject.asObservable()
  }
}
