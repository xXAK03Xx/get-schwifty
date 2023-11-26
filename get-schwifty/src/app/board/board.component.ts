import { Component, HostListener } from '@angular/core';
import { Tile } from '../tile';
import { TileManagerService } from '../tile-manager.service';
import { LocalstorageService } from '../localstorage.service';
import { MatDialog } from '@angular/material/dialog';
import {DialogNameComponent} from '../dialog-name/dialog-name.component'
import { Router } from '@angular/router';
import { SolverService } from '../solver.service'; 

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [],
})


export class BoardComponent {

  cols: number = 3;
  rows: number = 3;
  height: number = 600;
  width: number = 600;
  tiles: Tile[] = [];
  showNums: boolean = false;
  userInput: number = 0;
  startTime: number = -1;

  constructor(private tileManagerService: TileManagerService, private localStorageService: LocalstorageService,
     public dialog: MatDialog, private router: Router, private solverService: SolverService){}


  ngOnInit(): void
  {
    this.tiles =  this.tileManagerService.initializeTiles(this.rows, this.cols);
  }


  // formatLabel(value: number): string {
  //   console.log(value);
  //   this.cols = value;
  //   this.rows = value;
  //   // this.tileManagerService.setRowCol(value, value);
  //   return `${value}`;
  // }


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    console.log(event.key);
    this.tileManagerService.moveWithKeyPress(event.key);
    if (this.tileManagerService.userWin() && this.localStorageService.startTime != -1 ) 
    {
      if (this.localStorageService.madeItToLeaderboard(this.rows)) {
        console.log("user have won");
        this.openDialog();
      }
      else{      
        this.localStorageService.startTime = -1;
      }
    }
  }

  openDialog()
  {
    //check if user actually got to the leaderboard
    const dialogRef = this.dialog.open(DialogNameComponent,{
      panelClass: 'dialog-design',
      width: '60%',
      height: '30%',
      enterAnimationDuration: '1000ms',
      role: 'dialog',
      data: {userName: "winner"}});


    dialogRef.afterClosed().subscribe(
      data => {
        // let dataT = data == ""? data = "anonymous": data;
        this.localStorageService.setName( data);
        this.localStorageService.addScore(this.cols);
        this.router.navigate(['/leaderboard']);
      }      
    );   

  }

  handleSliderChange()
  {
  }

  onInputChange(event: Event) {
    const val = +(event.target as HTMLInputElement).value;
    this.cols = val;
    this.rows = val;
    this.tiles = this.tileManagerService.initializeTiles(this.rows, this.cols);
  }

  
  calcFrs(): string
  {
    let frs = "";
    for (let i = 0; i < this.rows; i++) {
      frs += "1fr ";
    }
    return frs
  }

  handleResetClick()
  {
    this.tileManagerService.reset();
    this.startTime = -1;
    this.localStorageService.setTimer(-1);
    // this.tiles = this.tileManagerService.getTiles();
  }


  handleSolveClick()
  {
    let path = this.solverService.findSolvedPath(this.tiles);
    console.log(path);
  }

  handleShuffleClick()
  {
    this.tileManagerService.suffleTiles();
    this.startTime = performance.now();
    this.localStorageService.setTimer(performance.now());
    // this.tiles = this.tileManagerService.getTiles();
  }

  handleCheckboxChange()
  {
    this.showNums = !this.showNums;
  }
}
