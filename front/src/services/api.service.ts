import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Enviroment } from 'src/enviroments/enviroment';
import { LoginInput } from 'src/inputs/loginInput';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from 'src/models/usuario';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient, private enviroment: Enviroment, private route: Router, private toastr: ToastrService) { }

    private getHeaders() {
        const token = this.getToken();

        if (!token)
            return;

        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        })
    }

    login(body: LoginInput) {
        const url = this.enviroment.baseUrl + "/login";
        return this.request<any>(this.http.post(url, body, { responseType: 'text' }));
    }

    getCurrentUser() {
        const url = this.enviroment.baseUrl + "/api/usuario/get-current-user";
        return this.request<Usuario>(this.http.get<Usuario>(url, { headers: this.getHeaders() }));
    }

    show(filter: string = "") {
        const url = this.enviroment.baseUrl + `/api/usuario/show?id=${sessionStorage.getItem("userId")}&filter=${filter}`;
        return this.request<Usuario[]>(this.http.get<Usuario[]>(url, { headers: this.getHeaders() }));
    }

    save(input: Usuario, changePassword: boolean) {
        const url = this.enviroment.baseUrl + `/api/usuario/save?changePassword=${changePassword}`;
        return this.request<Usuario>(this.http.post<Usuario>(url, input, { headers: this.getHeaders() }));
    }

    index(id: number) {
        const url = this.enviroment.baseUrl + `/api/usuario/index?id=${id}`;
        return this.request<Usuario>(this.http.get<Usuario>(url, { headers: this.getHeaders() }));
    }

    destroy(id: number) {
        const url = this.enviroment.baseUrl + `/api/usuario/destroy?id=${id}`;
        return this.request<any>(this.http.delete<any>(url, { headers: this.getHeaders() }));
    }

    public logout() {
        sessionStorage.clear();
        this.route.navigate(['login']);
    }

    public routeHome(){
        this.route.navigate(['']);
    }

    private getToken() {
        const token = sessionStorage.getItem('token');
        if (!token) {
            this.logout();
            return;
        }

        return token;
    }

    private request<T>(request: Observable<T>): Observable<T> {
        return request.pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status == 401 || error.status == 403) {
                    this.logout();
                }

                if (error.status != 401 && error.status != 403) {
                    this.toastr.error(error.error, '', {
                        positionClass: 'toast-bottom-right'
                    });
                }

                return throwError(error);
            }
            ));
    }

}