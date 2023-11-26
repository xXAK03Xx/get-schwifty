import { Inject, Injectable, Optional } from '@angular/core';
import { Tile } from './tile';


@Injectable({
  providedIn: 'root'
})
export class SolverService {

  constructor() { }
  size: number = 3;
  counter: number = 0;

  findSolvedPath(tiles: Tile[]): Tile[][]
  {
    let arr = tiles.slice();
    let path: Tile[][] = [];
    let arrLocations = [];
    for (let index = 0; index < arr.length; index++) {
      arrLocations.push(arr[index].originalIndex);
      
    } 
    this.findSolvedPathHelper(arr, path, new Map<string, number>());
    console.log(path);
    return path;
  }

  findSolvedPathHelper(curArr: Tile[], path: Tile[][], hashMap: Map<string, number>): boolean
  {
    if (this.chackEndSolve(curArr))
    {
      path.push(curArr);
      return true;  
    }
    let location = [];
    for (let index = 0; index < curArr.length; index++) {
      location.push(curArr[index].originalIndex);      
    }
    if (hashMap.has(location.toString())) {
      return false;
    }
    hashMap.set(curArr.toString(), this.counter++);
    console.log(curArr);
    let res = false;
    const emptyIndex = this.findIndexOfEmptyTileSolver(curArr);
    let swapIndex = emptyIndex;
    //go up
    if (emptyIndex - this.size >= 0) {
      swapIndex = emptyIndex - this.size;
      this.swapTiles(curArr, swapIndex, emptyIndex);
      path.push(curArr);
      res ||= this.findSolvedPathHelper(curArr, path, hashMap);
      this.swapTiles(curArr, swapIndex, emptyIndex);
      path.pop();
    }
    
    //go down
    if (emptyIndex + this.size < curArr.length) {
      swapIndex = emptyIndex + this.size;
      this.swapTiles(curArr, swapIndex, emptyIndex);
      path.push(curArr);
      res ||= this.findSolvedPathHelper(curArr, path, hashMap);
      this.swapTiles(curArr, swapIndex, emptyIndex);
      path.pop();
    }

    //go right    
    if (emptyIndex + 1 < curArr.length && (emptyIndex + 1) % this.size != 0) {
      swapIndex = emptyIndex + 1;
      this.swapTiles(curArr, swapIndex, emptyIndex);
      path.push(curArr);
      res ||= this.findSolvedPathHelper(curArr, path, hashMap);
      this.swapTiles(curArr, swapIndex, emptyIndex);
      path.pop();
    }

    // go left    
    if (emptyIndex - 1 >= 0 && (emptyIndex) % this.size != 0) {
      swapIndex = emptyIndex - 1;
      this.swapTiles(curArr, swapIndex, emptyIndex);
      path.push(curArr);
      res ||= this.findSolvedPathHelper(curArr, path, hashMap);
      this.swapTiles(curArr, swapIndex, emptyIndex);
      path.pop();
    }

    return false;
  }

  swapTiles(arr: Tile[], i: number, j: number): void
  {
    arr[i].currentIndex = j;
    arr[j].currentIndex = i;
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    // check if this works;
    // [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
  }


  chackEndSolve(arr: Tile[]): boolean
  {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].originalIndex !== i) {
        return false;
      }      
    }
    return true;
  }


  findIndexOfEmptyTileSolver(arr: Tile[]): number
  {
    for (let index = 0; index < arr.length; index++) {
      if (arr[index].isEmpty) {
        return index;  
      }      

    }
    return arr.length - 1;
  }

}
