import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthDataService } from './auth-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(public authData: AuthDataService, public router: Router) { }

  canActivate(): boolean {
    if (this.authData.getLoggedInUser() != null && this.authData.getLoggedInUser()?.isAdmin) {
      return true;
    }else{
      this.router.navigate(['auth']);
      return false;
    }
  }
}
