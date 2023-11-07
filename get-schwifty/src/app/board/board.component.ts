import { Component } from '@angular/core';
import { Tile } from '../tile';
import { TileManagerService } from '../tile-manager.service';




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

  constructor(private tileManagerService: TileManagerService){console.log(this.rows)}


  ngOnInit(): void
  {
    this.tiles =  this.tileManagerService.initializeTiles(this.rows, this.cols);
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
    // this.tiles = this.tileManagerService.getTiles();
  }

  handleShuffleClick()
  {
    this.tileManagerService.suffleTiles();
    // this.tiles = this.tileManagerService.getTiles();
  }

  handleCheckboxChange()
  {
    this.showNums = !this.showNums;
  }
}
