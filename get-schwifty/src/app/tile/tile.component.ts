import { Component, Input} from '@angular/core';
import { Tile } from '../tile';
import { TileManagerService } from '../tile-manager.service';
import { SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})


export class TileComponent {
  @Input() tile!: Tile;
  @Input() size!: number;
  @Input() showNums!: boolean;


  constructor(private tileManagerService: TileManagerService){}

  ngOnChanges(changes: SimpleChanges) {
    // this.size = this.tileManagerService.getSize();
    console.log("change has been called: " + this.size);
  }
  
  ngOnInit():void
  {
  }

  clickHandler()
  {
    console.log("ive been clicked");
    console.log(this.tile.isEmpty);
    this.tileManagerService.move(this.tile);
  }

  calcSize(): string
  {
    if (this.tile.isEmpty) {
      return '100% 100%';
    }
    const num = (this.size * 100) + 18;
    return num + "% " + num + "%"; 
  }

  getBackgroundPosition(): string
  {
    if (this.tile.isEmpty) {
      return '';
    }
    return this.tile.bPosVertical +'px ' + this.tile.bPosHorizontal + 'px'; 
  }

  getTileImage(): string
  {
    if (!this.tile.isEmpty) {
      return ('url(' + this.tile.urlImg + ')').toString();
    }
    else
    {
      return " url('../../assets/smilyWhiteSquare.jpg')";
    }

  }

  
  getPos()
  {
    return {'background-position': this.tile.bPosHorizontal + 'px ' + this.tile.bPosVertical};
  }

  showTileNum(): string
  {
    if (!this.tile.isEmpty) {
      return (this.tile.originalIndex + 1).toString();
    }
    return "";
  }

}
