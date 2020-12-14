import { Component, OnInit } from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss'],
  providers: [DialogService]
})
export class ResetPasswordDialogComponent implements OnInit {

  email: string;

  constructor(public ref: DynamicDialogRef) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.ref.close(this.email);
  }

}
