import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalExcluirComponent } from '../modal-excluir/modal-excluir.component';
import { Usuario } from 'src/models/usuario';
import { ApiService } from 'src/services/api.service';
import { ToastrService } from 'ngx-toastr';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.scss']
})

export class ListUsuariosComponent implements OnInit {

  
  displayedColumns: string[];
  isAdmin: boolean;
  users: Usuario[];
  filter: string;

  constructor(private route: Router, public dialog: MatDialog, private apiService: ApiService, private toats: ToastrService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Usuario>();

  async ngOnInit() {
    this.isAdmin = sessionStorage.getItem("admin") == "true" ? true : false;
    this.displayedColumns = this.isAdmin ? ['codigo', 'nome', 'email', 'tipo', 'options'] : ['codigo', 'nome', 'email', 'tipo'];
    this.filter = "";

    this.users = await this.apiService.show().toPromise() as Usuario[];
    this.dataSource = new MatTableDataSource<Usuario>(this.users);
    this.dataSource.paginator = this.paginator;
  }

  goToEdit(id: number) {
    this.route.navigate(["edit-usuario"], { queryParams: { id: id } });
  }

  async getUsers() {
    this.users = await this.apiService.show(this.filter).toPromise() as Usuario[];
    this.dataSource = new MatTableDataSource<Usuario>(this.users);
    this.dataSource.paginator = this.paginator;
  }

  async delete(id: number) {
    const response = await this.apiService.destroy(id).toPromise();

    this.toats.success('Usuário excluído com sucesso!', '', {
      positionClass: 'toast-bottom-right'
    });

    this.ngOnInit();

  }

  openModal(id: number, name: string) {
    const dialogRef = this.dialog.open(ModalExcluirComponent, {
      width: '300px',
      data: { name: name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "delete") {
        this.delete(id);
      }
    });
  }
}
