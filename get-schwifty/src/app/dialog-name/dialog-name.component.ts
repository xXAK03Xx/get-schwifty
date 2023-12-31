import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-name',
  templateUrl: './dialog-name.component.html',
  styleUrls: ['./dialog-name.component.css']
})
export class DialogNameComponent {

  userInput: string = "Winner";
  
  constructor(
    public dialogRef: MatDialogRef<DialogNameComponent>,
    @Inject(MAT_DIALOG_DATA) public userName: string,
  ) 
  {console.log(userName)}

  onNoClick(): void {
    this.userName = this.userInput === "" ? this.userInput = "anonymous": this.userInput;
    // this.userName = this.userInput;
    this.dialogRef.close(this.userName);
  }
}
