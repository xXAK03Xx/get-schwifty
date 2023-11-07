import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  {path: 'leaderboard', component: LeaderboardComponent },
  {path: 'game', component: BoardComponent },
  { path: '',   redirectTo: '/game', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
