import { Component, OnInit } from '@angular/core';
import { AuthDataService } from '../auth-data.service';
import {Item} from '../item';
import { ItemDataService } from '../item-data.service';
import { Order } from '../order';
import { OrderDataService } from '../order-data.service';
import { DatePipe } from '@angular/common';
import { User } from '../user';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})

export class BrowseComponent implements OnInit {

  itemListP: any;
  itemList: Item[] = [];
  constructor(private itemData: ItemDataService, private orderService: OrderDataService, private authData: AuthDataService, private datePipe: DatePipe) { }

  async getItems(){
    this.itemListP = await this.itemData.getAllItems();
    for(let i = 0; i < this.itemListP.length; i++){
      let item:Item = new Item(this.itemListP[i].id,this.itemListP[i].name, this.itemListP[i].description, this.itemListP[i].cost, this.itemListP[i].image);
      this.itemList.push(item);
    }
  }

  ngOnInit(): void {
    this.getItems();
  }

  processOrder(itemId: string){
    for(let i = 0; i < this.itemList.length; i++){
      if(this.itemList[i].itemId == itemId){
        let loggedInUser: User|null = this.authData.getLoggedInUser();
        let dateString: string|null = this.datePipe.transform(new Date(), 'yyyy-MM-dd-hh:mm:ss');
        if(loggedInUser != null && dateString != null){
          this.orderService.addOrder(new Order(loggedInUser.username, dateString, this.itemList[i].itemId,this.itemList[i].name,this.itemList[i].cost));
        }
      }
    }
  }
}
