import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUsuariosComponent } from './components/list-usuarios/list-usuarios.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { TitlePageComponent } from './components/title-page/title-page.component';
import { LoginComponent } from './components/login/login.component';
import { EditUsuarioComponent } from './components/edit-usuario/edit-usuario.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalExcluirComponent } from './components/modal-excluir/modal-excluir.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { Enviroment } from 'src/enviroments/enviroment';
import { ApiService } from 'src/services/api.service';
import { ToastrModule } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModalLogoutComponent } from './components/modal-logout/modal-logout.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUsuariosComponent,
    TopBarComponent,
    TitlePageComponent,
    LoginComponent,
    EditUsuarioComponent,
    ModalExcluirComponent,
    ModalLogoutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatMenuModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatSlideToggleModule,
    MatPaginatorModule
  ],
  providers: [
    Enviroment,
    ApiService,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { panelClass: ['mycsssnackbartest'] },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
