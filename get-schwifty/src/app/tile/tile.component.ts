import { Component, Input} from '@angular/core';
import { Tile } from '../tile';
import { TileManagerService } from '../tile-manager.service';
import { SimpleChanges } from '@angular/core';
import { LocalstorageService } from '../localstorage.service';
import { MatDialog } from '@angular/material/dialog';
import {DialogNameComponent} from '../dialog-name/dialog-name.component'

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})


export class TileComponent {
  @Input() tile!: Tile;
  @Input() size!: number;
  @Input() showNums!: boolean;
  userName: string = "";

  constructor(private tileManagerService: TileManagerService, private localStorageService: LocalstorageService, public dialog: MatDialog){}

  ngOnChanges(changes: SimpleChanges) {
    // this.size = this.tileManagerService.getSize();
    console.log("change has been called: " + this.size);
  }
  
  openDialog()
  {
    this.dialog.open(DialogNameComponent,{
      data: {userName: this.userName}});
  }
  
  ngOnInit():void
  {
  }

  clickHandler()
  {
    console.log("ive been clicked");
    console.log(this.tile.isEmpty);
    this.tileManagerService.move(this.tile);
    if (this.tileManagerService.userWin()) 
    {
      console.log("user have won");
      this.openDialog();
      this.localStorageService.addScore(this.size);
    }
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
