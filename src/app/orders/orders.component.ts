import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthDataService } from '../auth-data.service';
import { Order } from '../order';
import { OrderDataService } from '../order-data.service';
import { VERSION } from '@angular/material/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(public orderData: OrderDataService, public authData: AuthDataService, private router: Router) { }

  @ViewChild(MatTable) table!: MatTable<any>;

  columndefs : any[] = ['username','date', 'itemname', 'itemcost'];
  orders: Order[] = [];

  async getOrdersForUser(){
    if(this.authData.getLoggedInUser() != null){
    await this.orderData.getOrdersByUsername(this.authData.getLoggedInUser()!.username).then(res=>{
      for(let i = 0; i < res.length; i++){
        this.orders.push(new Order(res[i].username,res[i].orderDate,res[i].orderedItemId,res[i].orderedItemName,res[i].orderedItemCost));
      }
      this.table.renderRows();
    })
  }
  }

  navigateToAllOrders(){
    this.router.navigate(['adminorders']);
  }

  ngOnInit(): void {
    this.getOrdersForUser();
  }

}
