import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalLogoutComponent } from '../modal-logout/modal-logout.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent{
  isLoginPage: boolean = false;
  url: string = ''
  public email: string;


  constructor(private apiService: ApiService, private router: Router, public dialog: MatDialog) {
    this.email = sessionStorage.getItem('email') as string;
  }

  goToPerfil(){
    this.router.navigate(["edit-usuario"], { queryParams: { id: sessionStorage.getItem('userId') } });
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalLogoutComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "logout") {
        this.apiService.logout();
      }
    });
  }  


}
