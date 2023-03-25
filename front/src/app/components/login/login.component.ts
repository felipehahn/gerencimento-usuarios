import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginInput } from 'src/inputs/loginInput';
import { ApiService } from 'src/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Usuario } from 'src/models/usuario';
import { userType } from 'src/enums/userType';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  public email: string = "";
  public senha: string = "";

  constructor(private apiService: ApiService, private toastr: ToastrService, private route: Router) {
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required]);
  typeFormControl = new FormControl('', [Validators.required]);
  passFormControl = new FormControl('', [Validators.required]);

  ngOnInit() {
    sessionStorage.clear();
  }

  async login() {
    debugger;
    const input = new LoginInput(this.email, this.senha);

    try {
      const response = await this.apiService.login(input).toPromise();
      sessionStorage.setItem("token", response);

      const currentUser = await this.apiService.getCurrentUser().toPromise() as Usuario;
      sessionStorage.setItem("email", currentUser.login as string);
      sessionStorage.setItem("userId", currentUser.id?.toString() as string);

      if (currentUser.tipo == userType.administrador) {
        sessionStorage.setItem("admin", 'true');
      }
      else {
        sessionStorage.setItem("admin", 'false');
      }

      this.route.navigate(['']);
    }
    catch {
      this.toastr.error('E-mail ou senha inválidos.', '', {
        positionClass: 'toast-bottom-right'
      });
    }
  }
}
