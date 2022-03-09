import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { ProfileComponent } from './app/profile/profile.component';
import { SquadComponent } from './app/squad/squad.component';
import { RosterComponent } from './app/roster/roster.component';
import { AppComponent } from '../src/app/app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'roster',
    component: RosterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'squad',
    component: SquadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
