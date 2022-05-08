import { Injectable } from '@angular/core';
import { User } from './user';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  originalAdmin: User = new User('admin', 'admin', 'admin@admin.com', true, 'postcode', 'city', 'country', 'address');
  loggedInAs!: User;

  public getLoggedInUser(){
    let user = localStorage.getItem('loggedInUser');
    if(user !== null){
      return JSON.parse(user) as User;
    }else{
      return null;
    }
  }

  public setLoggedInUser(user: User){
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  public logout(){
    localStorage.removeItem('loggedInUser');
  }

  public modifyUser(id: string, _username: string, _postCode: string, _password: string, _email: string, _country:string, _city: string, _address: string){
    this.firestore.doc('users/' + id).update({username:_username, postCode:_postCode,password:_password, 
      email:_email, country:_country, city: _city, address: _address});
      this.logout();
  }

  getAllUsers() {
    return new Promise<any>((resolve)=> {
    this.firestore.collection('users').valueChanges({ idField: 'id' }).subscribe(users => resolve(users));
    })
   }

  public async getUserByUserName(username: string){
    let users: any = await this.getAllUsers();
      for(let i = 0, len = users.length; i < len; i++){
        if(users[i].username == username){
          let user = new User(users[i].username,users[i].password,users[i].email,users[i].isAdmin,users[i].postCode,users[i].city,users[i].country,users[i].address);
          user.uid = users[i].id;
          return user;
        }
      }
      return null;
  }

  public async addUser(user: User){
    let users: any = await this.getAllUsers();
    console.log(users);
    for(let i = 0, len = users.length; i < len; i++){
      console.log(users[i].username);
      if(users[i].username == user.username || users[i].email == user.email)
      {
        return false;
      }
    }
    new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("users")
          .add(JSON.parse(JSON.stringify(user)))
          .then(res => {}, err => reject(err));
    });
    return true;
  }

  constructor(private firestore: AngularFirestore) {}
}
