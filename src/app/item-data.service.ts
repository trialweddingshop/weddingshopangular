import { Injectable } from '@angular/core';
import { Item } from './item';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ItemDataService {

  constructor(private firestore: AngularFirestore) { }

  getAllItems() {
    return new Promise<any>((resolve)=> {
    this.firestore.collection("items").valueChanges({ idField: 'id' }).subscribe(items => resolve(items));
    });
   }

   public async addItem(item: Item){
     let maxItemIndex:number = 0;
     await this.getAllItems().then(allItems => {
        let localitem:Item = new Item('dummy',item.name,item.description,item.cost,item.image);
        new Promise<any>((resolve, reject) =>{
          this.firestore
              .collection("items")
              .add(JSON.parse(JSON.stringify(localitem)))
              .then(res => {}, err => reject(err));
        });
     })
  }

}
