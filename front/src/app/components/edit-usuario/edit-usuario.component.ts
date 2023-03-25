import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { userType } from 'src/enums/userType';
import { Usuario } from 'src/models/usuario';
import { ApiService } from 'src/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.scss']
})
export class EditUsuarioComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required]);
  typeFormControl = new FormControl('', [Validators.required]);
  passFormControl = new FormControl('', [Validators.required]);

  user: Usuario;
  userId: number;
  showFieldPassword: boolean = true;
  color: ThemePalette = 'primary';
  checked: boolean = false;
  passwordOld: string = "";
  changePassword: boolean = false;
  isAdmin: boolean;

  constructor(private toastr: ToastrService, private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.userId = parseInt(queryParams['id']);
      }
    )

    this.isAdmin = sessionStorage.getItem('admin') == "true";

    if (!this.isAdmin){
      this.emailFormControl.disable()
      this.nameFormControl.disable()
      this.typeFormControl.disable()
    }

    if (this.userId && this.userId != 0) {
      this.user = await this.apiService.index(this.userId).toPromise() as Usuario;

      if (!this.user)
        this.user = new Usuario(0, '', '', userType.usuario, '');
      else {
        this.showFieldPassword = false;
        this.passwordOld = this.user.password as string;
      }
    }
    else
      this.user = new Usuario(0, '', '', userType.usuario, '')
  }

  async save() {
    let msg = '';

    if (this.nameFormControl.hasError('required'))
      msg = "É necessário informar o Nome do usuário.";

    else if (this.emailFormControl.hasError('required'))
      msg = "É necessário informar o E-mail do usuário.";

    else if (this.emailFormControl.hasError('email'))
      msg = "O E-mail informado é inválido.";

    else if (this.typeFormControl.hasError('required'))
      msg = "É necessário informar o Tipo do usuário.";

    else if (!this.user.password)
      msg = "É necessário informar a Senha do usuário.";

    if (msg && msg != "") {
      this.toastr.error(msg, '', {
        positionClass: 'toast-bottom-right'
      });

      return;
    }

    if (!this.user.id)
      this.changePassword = true;
    else if (this.checked && this.passwordOld != this.user.password)
      this.changePassword = true;

    const response = await this.apiService.save(this.user, this.changePassword).toPromise();
    this.user = response as Usuario;

    this.toastr.success('Usuário salvo com sucesso!', '', {
      positionClass: 'toast-bottom-right'
    });


    this.router.navigate([""]);

  }

  onChangeAlterarSenha() {
    debugger;
    this.checked = !this.checked;
    this.showFieldPassword = !this.showFieldPassword;

    if (this.showFieldPassword) {
      this.user.password = '';
    }
    else {
      this.user.password = this.passwordOld
    }
  }

}
