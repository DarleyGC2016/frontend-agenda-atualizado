import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Live } from 'src/app/shared/model/live.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { LiveService } from 'src/app/shared/service/live.service';
import * as moment from 'moment';

@Component({
  selector: 'app-live-update',
  template: 'passed in {{ data.liveName }}',
  templateUrl: './live-update.component.html',
  styleUrls: ['./live-update.component.css'],
})
export class LiveUpdateComponent implements OnInit {
  live = this.data;
  liveForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private rest: LiveService,
    public dialogRef: MatDialogRef<LiveUpdateComponent>
  ) {}

  ngOnInit(): void {
    this.liveForm = this.fb.group({
      liveName: [this.data.liveName, [Validators.required]],
      channelName: [this.data.channelName, [Validators.required]],
      liveLink: [this.data.liveLink, [Validators.required]],
      liveDate: [this.data.liveDate, [Validators.required]],
      liveTime: [this.data.liveTime, [Validators.required]],
      categoria: [this.data.categoria, [Validators.required]],
    });
    this.liveForm.patchValue(this.live.liveName);
  }
  updateLive(): void {
    let newDate: moment.Moment = moment
      .utc(this.liveForm.value.liveDate)
      .local();
    this.liveForm.value.liveDate =
      newDate.format('YYYY-MM-DD') + 'T' + this.liveForm.value.liveTime;

    this.rest
      .updateSingleLive(this.data.id, this.liveForm.value)
      .subscribe((result) => {
        console.log('Updadte: live: ', result);
      });
    this.cancel();
    window.location.reload();
  }
  cancel(): void {
    this.dialogRef.close();
    this.liveForm.reset();
  }
}
