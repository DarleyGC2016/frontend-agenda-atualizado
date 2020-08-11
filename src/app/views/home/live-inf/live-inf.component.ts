import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-live-inf',
  templateUrl: './live-inf.component.html',
  styleUrls: ['./live-inf.component.css'],
})
export class LiveInfComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<LiveInfComponent>) {}

  ngOnInit(): void {}
  sair() {
    this.dialogRef.close();
    window.location.reload();
  }
}
