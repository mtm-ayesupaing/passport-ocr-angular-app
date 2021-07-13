import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss']
})
export class CommonDialogComponent implements OnInit {

  public action: string;
  public body: any;
  public title: string;
  public actionButtonLabel: string;
  public buttonColor = 'primary';

  constructor(
    public dialogRef: MatDialogRef<CommonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.body = data.body;
    this.action = data.action;
    if (this.body.removed) {
      this.actionButtonLabel = 'ロールバックする';
      this.buttonColor = 'primary';
    } else {
      this.actionButtonLabel = '削除する';
      this.buttonColor = 'warn';
    }
  }

  ngOnInit(): void {
  }

  doAction(): void {
    this.dialogRef.close({ action: this.action, data: this.body });
  }
}
