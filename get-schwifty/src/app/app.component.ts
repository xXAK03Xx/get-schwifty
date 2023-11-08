import { Component, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { Tile } from './tile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  constructor(){}

  @ViewChild('canvasboard', { read: ElementRef, static: true }) canvasB!:ElementRef;
  @ViewChild('divtest', { read: ElementRef, static: true }) divTest!:ElementRef;
  
  pieces:number[] = [];
  //tiles: Tile = undefined;

  cols: number = 5;
  rows: number = 5;
  height: number = 600;
  width: number = 600;
  canvas: HTMLCanvasElement | null = null;
  title = "olo";
  tiles: Tile[] = [];
  blankTileIndex: number = 0;

  ngOnInit():void
  {
    // this.divTest.nativeElement.innerHTML = "this works";
    // let vert = 0;
    // let horiz = 0;
    // let vertDevider = (this.height / this.cols) + 2;
    // let horizDevider = (this.width / this.rows) + 2;
    // for (let i = 0; i < this.rows; i++) 
    // {
    //   for (let j = 0; j < this.cols; j++) 
    //   {
    //     let tileTemp: Tile = {originalIndex: i + j,
    //       currentIndex: i+j,
    //       bPosVertical: vert,
    //       bPosHorizontal: horiz,
    //       urlImg: "https://wallpapers.com/images/featured/4k-nature-ztbad1qj8vdjqe0p.jpg",
    //       // urlImg: "file://C:\Users\ariel\Pictures\Camera Roll\WIN_20210823_12_06_10_Pro.jpg",
    //       isEmpty: false
    //     }
    //     this.tiles.push(tileTemp);
    //     vert -= vertDevider;
    //   }
    //   vert = 0;
    //   horiz -= horizDevider;
    // }
    // // this.suffleTiles();
    // // this.makeEmptyTile();
    // this.tiles[this.tiles.length - 1].isEmpty = true;
    // this.tiles[this.tiles.length - 1].urlImg = "white";
  }

  // checkMoveValid(): boolean
  // {
  //   if () 
  //   {
      
  //   }
  // }

  // move()
  // {
  //   if (this.checkMoveValid()) 
  //   {

  //   }
  // }

  makeEmptyTile(): void
  {
    this.blankTileIndex = Math.floor(Math.random() * this.tiles.length);
    this.tiles[this.blankTileIndex].isEmpty = true;
    this.tiles[this.blankTileIndex].urlImg = 'white';
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
    for (let i = 0; i < 100; i++) {

      let ran1 = Math.floor(Math.random() * this.tiles.length);
      let ran2 = Math.floor(Math.random() * this.tiles.length);
      this.swapTiles(ran1, ran2);
    }
  }

  calcFrs(): string
  {
    let frs = "";
    for (let i = 0; i < this.rows; i++) {
      frs += "1fr ";      
    }
    return frs
  }

  setUpTiles(): void
  {
    for (let i = 0; i < this.rows; i++) 
    {
      for (let j = 0; j < this.cols; j++) 
      {
        const x = i * this.height;
        const y = j * this.width;

      }
      
    }
  }
  

  drawImageActualSize(img: HTMLImageElement): void {
    const context = this.canvas!.getContext("2d")
    
    
    // Use the intrinsic size of image in CSS pixels for the canvas element
    // this.canvas!.width = img.naturalWidth;
    // this.canvas!.height = img.naturalHeight;
  
    // Will draw the image as 300x227, ignoring the custom size of 60x45
    // given in the constructor

    
    // context!.drawImage!(img, 0, 0);
  
    // To use the custom size we'll have to specify the scale parameters
    // using the element's width and height properties - lets draw one
    // on top in the corner:



    context!.drawImage(img, 0, 0, this.width, this.height);
    
  }


  drawRectengle(context: CanvasRenderingContext2D):void
  {
    context.fillRect(20,20,100,100);
    context.clearRect(40,40,30,100);
    context.strokeRect(50,50,10,10);
  }
}
