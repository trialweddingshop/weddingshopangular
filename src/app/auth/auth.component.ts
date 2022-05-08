import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import {Router} from "@angular/router"
import { AuthDataService } from '../auth-data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router: Router, public authData: AuthDataService) {}

  ngOnInit(): void {
    if(this.authData.getLoggedInUser() != null){
      this.model = this.authData.getLoggedInUser()!;
    }
  }

  public model = new User('username', 'password', 'name@domain.com', true, 'postcode', 'city', 'country', 'address');
  
  isLogin = true;
  switchButtonText = "Register"
  
  onSubmit(form: NgForm) {
    let isLoggedIn = false;
    let user:User = new User('','eqfguqgWEFWQQ3542545__:?_?_:?_wwegiq','',false,'','','','');
    this.authData.getUserByUserName(form.value.username).then(res => {
      if(res !== null){
        user = res;
      }
    if(user !== null){
      if(user.password == form.value.password){
        this.authData.setLoggedInUser(user);
        console.log('login success');
        this.router.navigate(['/main']);
      }else{
        console.log('password is wrong');
      }
    }else{
      console.log('user is null');
    }
    });
  }
  onSubmitRegister(form: NgForm) {
    this.authData.addUser(new User(form.value.username, form.value.password,form.value.email, false, form.value.postcode, form.value.city, 
      form.value.country, form.value.address)).then(res => {if(res){this.switchView()}});
      //this.router.navigate(['auth']);
  }

  onSubmitModify(form: NgForm){
    console.log(this.model);
    console.log(this.authData.getLoggedInUser()!.uid)
    this.authData.modifyUser(this.authData.getLoggedInUser()!.uid, this.model.username,this.model.postCode,this.model.password,this.model.email,
    this.model.country,this.model.city,this.model.address);
  }
  switchView() {this.isLogin = !this.isLogin; if(this.isLogin){this.switchButtonText = "Register";}else{this.switchButtonText = "Login"}}
}
