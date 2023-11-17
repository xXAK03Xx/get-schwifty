import { Injectable } from '@angular/core';
import { Results } from './results';
import { Scores } from './scores';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  scoreKey: string = "scores";
  scores: Scores[] = [];
  startTime: number = -1;

  constructor() { }

  initializeScroes(): void
  {
    // this.scores = this.getScoresFromData();
    // let grades: Results[] = [{time: 99999999,name: "Ariel",date: new Date(Date.now())} , {time: 99999998,name: "ori",date: new Date(Date.now())}, {time: 99999999,name: "daniel",date: new Date()},{time: 99999999,name: "ariel",date: new Date()},{time: 99999999,name: "ori",date: new Date()}];
    //   // grades.push({time: 5,name: "test 22",date: 3})
    //   let olo = new Date(Date.now())
    //   let tempScores: Scores[] = [];
    //   for (let index = 0; index < 6; index++) {
    //     tempScores[index] = {rows: 3 + index, cols: 3 + index, results: grades};      
    //   }
    //   // let grades2 = JSON.parse(JSON.stringify(grades));
    //   // grades2.pop();
    //   // grades2.pop();
    //   // tempScores[5] = {rows: 8, cols: 8, results: grades2};      
    //   // let grades3 = JSON.parse(JSON.stringify(grades2));
    //   // grades3.pop();
    //   // tempScores[2] = {rows: 5, cols: 5, results: grades3}; 
    //   this.setScores(tempScores);
    // if (this.scores == null || this.scores.length == 0) {
    //   let grades: Results[] = [{time: 99999999,name: "Ariel",date: new Date()} , {time: 99999998,name: "ori",date: new Date(Date.now())}, {time: 99999999,name: "daniel",date: new Date()},{time: 99999999,name: "ariel",date: new Date()},{time: 99999999,name: "ori",date: new Date()}];
    //   // grades.push({time: 5,name: "test 22",date: 3})
    //   let tempScores: Scores[] = [];
    //   for (let index = 0; index < 6; index++) {
    //     tempScores[index] = {rows: 3 + index, cols: 3 + index, results: grades};      
    //   }
    //   this.setScores(tempScores);
    // }   
    this.scores = this.getScoresFromData();
    // this.scores[0].results = 
    for (let index = 0; index < this.scores.length; index++) {      
      this.sortGrades(this.scores[index].results);
    }
  }

  getScoresFromData(): Scores[]
  {
    let returnedScores = window.localStorage.getItem(this.scoreKey);
    // console.log(JSON.parse(oloReturned!));
    return JSON.parse(returnedScores!); 
    // return this.scores;
  }

  getGradesOfCategory(cat: number): Scores
  {
    for (let i = 0; i < this.scores.length; i++) {
      if (this.scores[i].rows == cat) {
        return this.scores[i];
      }      
    }
    return this.scores[0];
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
      return 0;
    });
  }

  setTimer(time:number)
  {
    this.startTime = time;
  }

  addScore(size: number)
  {
    if (this.startTime == -1) {
      return;
    }
    if (this.scores == null || this.scores.length == 0) {
      this.initializeScroes()
    }
    let res: Results = {time: performance.now() - this.startTime, name: "winner", date: new Date(Date.now())}
    this.scores[size - 3].results.push(res);
    this.sortGrades(this.scores[size - 3].results);
    this.scores[size - 3].results.pop();
    this.setScores(this.scores);
  }
}
