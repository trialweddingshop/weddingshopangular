import { Injectable } from '@angular/core';
import { Order } from './order';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthDataService } from './auth-data.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  public getOrdersByUsername(username: string){
    let loggedInUser = this.authData.getLoggedInUser();
    if(loggedInUser != null){
      return new Promise<any>((resolve)=> {this.firestore.collection('orders', ref=>ref.where('username', '==', loggedInUser!.username)).valueChanges({ idField: 'id' }).subscribe(orders => resolve(orders));})
    }
    return new Promise<any>((resolve)=>{});
  }

  public getOrders(){
      return new Promise<any>((resolve)=> {this.firestore.collection('orders', ref=>ref.orderBy('orderedItemCost', 'desc')).valueChanges({ idField: 'id' }).subscribe(orders => resolve(orders));})
  }

  public deleteOrder(id: string){
    this.firestore.doc('orders/' + id).delete();
  }

  public addOrder(order: Order){
    new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("orders")
          .add(JSON.parse(JSON.stringify(order)))
          .then(res => {}, err => reject(err));
    });
  }

  constructor(private firestore: AngularFirestore, private authData:AuthDataService) {}
}
