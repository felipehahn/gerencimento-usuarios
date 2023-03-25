import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListUsuariosComponent } from '../list-usuarios/list-usuarios.component';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-modal-excluir',
  templateUrl: './modal-excluir.component.html',
  styleUrls: ['./modal-excluir.component.scss']
})
export class ModalExcluirComponent {
  constructor(public dialogRef: MatDialogRef<ListUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

    onNoClick(): void {
      this.dialogRef.close();
    } 

    onDelete(){
      this.dialogRef.close("delete");
    }
}
