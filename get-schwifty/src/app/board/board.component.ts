import { Component } from '@angular/core';
import { Tile } from '../tile';
import { TileManagerService } from '../tile-manager.service';
import { LocalstorageService } from '../localstorage.service';




@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: []
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

  constructor(private tileManagerService: TileManagerService, private localStorageService: LocalstorageService){}


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

  handleSliderChange()
  {
    console.log("i was called");
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
