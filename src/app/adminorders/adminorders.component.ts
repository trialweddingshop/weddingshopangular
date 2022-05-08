import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthDataService } from '../auth-data.service';
import { Order } from '../order';
import { OrderDataService } from '../order-data.service';

@Component({
  selector: 'app-adminorders',
  templateUrl: './adminorders.component.html',
  styleUrls: ['./adminorders.component.css']
})
export class AdminordersComponent implements OnInit {

  constructor(public orderData: OrderDataService, public authData: AuthDataService, private router: Router) { }

  columndefs : any[] = ['username','date', 'itemname', 'itemcost','shipped'];
  orders: Order[] = [];

  @ViewChild(MatTable) table!: MatTable<any>

  async getOrders(){
    if(this.authData.getLoggedInUser() != null){
      this.orders = [];
    await this.orderData.getOrders().then(res=>{
      for(let i = 0; i < res.length; i++){
        this.orders.push(new Order(res[i].username,res[i].orderDate,res[i].orderedItemId,res[i].orderedItemName,res[i].orderedItemCost));
        this.orders[i].setId(res[i].id);
      }
      this.table.renderRows();
    })
  }
  }

  shippedOrder(id: string){
    this.orderData.deleteOrder(id);
    this.getOrders();
  }

  ngOnInit(): void {
    this.getOrders();
  }
}
