import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogNameComponent } from './dialog-name/dialog-name.component';
import { BoardComponent } from './board/board.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { TileComponent } from './tile/tile.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    DialogNameComponent,
    BoardComponent,
    LeaderboardComponent,
    TileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,

    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
