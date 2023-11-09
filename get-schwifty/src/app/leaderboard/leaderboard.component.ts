import { Component } from '@angular/core';
import { Results } from '../results';
import { Scores } from '../scores';
import { LocalstorageService } from '../localstorage.service';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {

  scoreKey: string = "scores"; 
  currentScore?: Scores = undefined;
  scores: Scores[] = [];

  constructor(private loaclStorageService: LocalstorageService){}

  ngOnInit(): void
  {
    this.loaclStorageService.initializeScroes();
    this.scores = this.loaclStorageService.getScoresFromData();
    this.currentScore = this.loaclStorageService.getGradesOfCategory(3);
    console.log(this.scores);
  }

  getDateOfRes(i: number): string
  {
    let temp = this.currentScore?.results[i].date;
    return temp!.toString().slice(0,10);
  }

  onClick(event: any) {
    let element = event.target || event.srcElement || event.currentTarget;
    // Get the id of the source element
    let elementId = element.id;
    this.currentScore = this.loaclStorageService.getGradesOfCategory(elementId);
  }
}
