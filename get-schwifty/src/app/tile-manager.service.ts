import { Inject, Injectable, Optional } from '@angular/core';
import { Tile } from './tile';

@Injectable({
  providedIn: 'root'
})
export class TileManagerService {

  height: number = 600;
  width: number = 600;
  cols: number = 3;
  rows: number = 3;
  tiles: Tile[] = [];

  constructor(
    // @Inject('cols') @Optional() private cols?: string,
    // @Inject('rows') @Optional() private rows?: string
  ){}


  initializeTiles(rows:number, cols: number): Tile[]
  {
    this.cols = cols;
    this.rows = rows;
    let vert = 0;
    let horiz = 0;
    let vertDevider = (this.height / this.cols) + 2;
    let horizDevider = (this.width / this.rows) + 2;
    let index = 0;
    for (let i = 0; i < this.rows; i++) 
    {
      for (let j = 0; j < this.cols; j++) 
      {
        let tileTemp: Tile = {originalIndex: index++,
          currentIndex: i+j,
          bPosVertical: vert,
          bPosHorizontal: horiz,
          urlImg: "https://wallpapers.com/images/featured/4k-nature-ztbad1qj8vdjqe0p.jpg",
          // urlImg: "file://C:\Users\ariel\Pictures\Camera Roll\WIN_20210823_12_06_10_Pro.jpg",
          isEmpty: false
        }
        this.tiles.push(tileTemp);
        vert -= vertDevider;
      }
      vert = 0;
      horiz -= horizDevider;
    }
    this.tiles[this.tiles.length - 1].isEmpty = true;
    this.tiles[this.tiles.length - 1].urlImg = "white";
    // this.suffleTiles();
    // this.makeEmptyTile();

    return this.tiles;
  }


  checkMoveValid(tile: Tile): boolean
  {
    let index = this.findIndexOfTile(tile);
    if (index - 1 >= 0 && this.tiles[index - 1].isEmpty) 
    {
      return true;
    }
    if (index + 1 < this.tiles.length && (index + 1) % this.rows != 0) 
    {
      if (this.tiles[index + 1].isEmpty) {
        return true;
      }
    }
    if (index + this.cols < this.tiles.length && this.tiles[index + this.cols].isEmpty) 
    {
      return true;
    }
    if (index - this.cols >= 0 && this.tiles[index - this.cols].isEmpty) 
    {
      return true;
    }
    return false;
  }

  findIndexOfTile(tile: Tile): number
  {
    for (let index = 0; index < this.tiles.length; index++) {
      if (this.tiles[index] == tile) {
        return index;  
      }      

    }
    return this.tiles.length - 1;
  }

  findIndexOfEmptyTile(): number
  {
    for (let index = 0; index < this.tiles.length; index++) {
      if (this.tiles[index].isEmpty) {
        return index;  
      }      

    }
    return this.tiles.length - 1;
  }

  move(tile: Tile)
  {
    if (this.checkMoveValid(tile)) 
    {
      this.swapTiles(this.findIndexOfTile(tile), this.findIndexOfEmptyTile())
    }
  }

  getTiles(): Tile[]
  {
    return this.tiles;
  }


  makeEmptyTile(): void
  {
    this.tiles[this.tiles.length - 1].isEmpty = true;
    this.tiles[this.tiles.length - 1].urlImg = 'white';
  }


  swapTiles(i: number, j: number): void
  {
    this.tiles[i].currentIndex = j;
    this.tiles[j].currentIndex = i;
    let temp = this.tiles[i];
    this.tiles[i] = this.tiles[j];
    this.tiles[j] = temp;
    // check if this works;
    // [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
  }


  suffleTiles() : void
  {
    this.shuffleT();
    console.log("shuffle called");
    let tempTiles: Tile[] = this.tiles;
    while (!this.solvable()) {
      this.tiles = tempTiles;
      this.shuffleT();
    }
    
  }

  shuffleT():void
  {
    for (let i = 0; i < 100; i++) {

      let ran1 = Math.floor(Math.random() * this.tiles.length);
      let ran2 = Math.floor(Math.random() * this.tiles.length);
      this.swapTiles(ran1, ran2);
    }
  }

  solvable():boolean 
  {
    console.log("solvable called called");

    let reversals = 0;
    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i].isEmpty) {
        continue;
      }
      for (let j = i + 1; j < this.tiles.length; j++) {
        if (!(this.tiles[j].isEmpty)) {
          if (this.tiles[i].originalIndex > this.tiles[j].originalIndex) {
            reversals++;
          }  
        }              
      }      
    }
    if (this.rows % 2 == 0) {
      const addetive = Math.floor((this.findIndexOfEmptyTile()) / this.rows) + 1;
      return (reversals + addetive) % 2 == 0;
    }
    else
    {
      return reversals % 2 == 0;
    }
  }

  reset()
  {    
    for (let i = 0; i < this.tiles.length; i++) 
    {
      for (let j = i + 1; j < this.tiles.length; j++) {
        this.swapTiles(i, this.tiles[i].originalIndex);
      }
    }
  }
}
