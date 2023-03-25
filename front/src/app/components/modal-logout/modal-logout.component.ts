import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-modal-logout',
  templateUrl: './modal-logout.component.html',
  styleUrls: ['./modal-logout.component.scss']
})
export class ModalLogoutComponent {
  constructor(public dialogRef: MatDialogRef<TopBarComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    ) { }

    onNoClick(): void {
      this.dialogRef.close();
    } 

    logout(){
      this.dialogRef.close("logout");
    }
}
