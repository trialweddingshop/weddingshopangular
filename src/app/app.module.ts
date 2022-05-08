import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowseComponent } from './browse/browse.component';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import { OrdersComponent } from './orders/orders.component';
import { ItemsComponent } from './items/items.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableModule } from "@angular/material/table";
import { AuthDataService } from './auth-data.service';
import { OrderDataService } from './order-data.service';
import { ItemDataService } from './item-data.service';
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AdminordersComponent } from './adminorders/adminorders.component';

@NgModule({
  declarations: [
    AppComponent,
    BrowseComponent,
    MainComponent,
    AuthComponent,
    OrdersComponent,
    ItemsComponent,
    AdminordersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [DatePipe, AuthDataService, OrderDataService, ItemDataService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
