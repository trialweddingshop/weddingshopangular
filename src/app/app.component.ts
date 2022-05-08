import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthDataService } from './auth-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wedding Shop';
  constructor(public authData: AuthDataService, private router:Router){}

  public logout(){
    this.authData.logout();
    this.router.navigate(['/main']);
  }
}
