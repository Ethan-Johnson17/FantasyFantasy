import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RosterComponent } from './roster/roster.component';
import { PlayerComponent } from './roster/player/player.component';
import { StaffComponent } from './staff/staff.component';
import { CoachesComponent } from './staff/coaches/coaches.component';
import { HeaderComponent } from './header/header.component';
import { AddPlayerComponent } from './roster/add-player/add-player.component';
import { ScheduleDirective } from './directives/schedule.directive';
import { ScheduleComponent } from './schedule/schedule.component';
import { FPlayersComponent } from './roster/f-players/f-players.component';
import { FreeAgentsComponent } from './roster/free-agents/free-agents.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { SquadComponent } from './squad/squad.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';

import { Routes, RouterModule } from '@angular/router';
import { CharacterComponent } from './squad/character/character.component';

@NgModule({
  declarations: [
    AppComponent,
    RosterComponent,
    PlayerComponent,
    StaffComponent,
    CoachesComponent,
    HeaderComponent,
    AddPlayerComponent,
    ScheduleDirective,
    ScheduleComponent,
    FPlayersComponent,
    FreeAgentsComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    SquadComponent,
    ProfileComponent,
    CharacterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'roster', component: RosterComponent },
      { path: 'squad', component: SquadComponent },
    ]),
    AuthModule.forRoot({
      // ...env.auth,
      domain: 'ethan-codeworks.us.auth0.com',
      clientId: '0EJ2LJh44xECoxvsuXQDV7WQTlpJf0LK',
      audience: 'https://EthanDev.com',
      serverUrl: 'http://localhost:5000',
      httpInterceptor: {
        allowedList: [
          'http://localhost:5000/api/*',
          'http://localhost:5000/account/*',
        ],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
