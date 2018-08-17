import { Component, OnInit,Inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef,MatDialog,} from "@angular/material";
@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent implements OnInit {
quantity:number;
measure:string;
  constructor(public dialog: MatDialog,
    private dialogRef: MatDialogRef<QuantityComponent>,
    @Inject(MAT_DIALOG_DATA) data
    ) {
      this.measure=data.measure;
      this.quantity=data.quantity;
     }

  ngOnInit() {
    console.log(this.quantity)
  }
  save() {
    this.dialogRef.close(this.quantity);
}
close() {
  this.dialogRef.close();
}

}


