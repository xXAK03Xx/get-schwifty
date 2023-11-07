import { Component } from '@angular/core';
import { Results } from '../results';
import { Scores } from '../scores';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {

  scoreKey: string = "scores"; 

  constructor(){}


  ngOnInit(): void
  {
    this.getScores()
  }

  getScores(): Scores[]
  {

    let returnedScores = window.localStorage.getItem(this.scoreKey);
    // console.log(JSON.parse(oloReturned!));
    return JSON.parse(returnedScores!);
    
  }

  setScores(scores: Scores[])
  {
    window.localStorage.setItem(this.scoreKey, JSON.stringify(scores));
  }

  sortGrades(grades: Results[]): void
  {
    grades.sort((a, b) => {

      if (a.time < b.time) {
        return -1;
      }
      if (a.time > b.time) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }
}
