import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  apiService: ApiService;
  constructor(apiService: ApiService, private router: ActivatedRoute) {
    this.apiService = apiService;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    debugger;
    if (!sessionStorage.getItem('token')) {
      this.apiService.logout();
      return false;
    }

    if (route.routeConfig?.path == "edit-usuario") {
      if (sessionStorage.getItem("admin") == "false") {
        const currentUserId = sessionStorage.getItem("userId") as string;
        let userId = route.queryParamMap.get("id")

        if (!userId || userId != currentUserId) {
          this.apiService.routeHome();
          return false
        }
      }
    }

    return true;
  }
}
