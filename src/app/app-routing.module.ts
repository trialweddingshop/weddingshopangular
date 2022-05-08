import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import { OrdersComponent } from './orders/orders.component';
import { ItemsComponent } from './items/items.component';
import { AuthguardService } from './authguard.service';
import { AdminordersComponent } from './adminorders/adminorders.component';
import { LoginAuthguardService } from './login-authguard.service';

const routes: Routes = [{ path: '', redirectTo: '/main', pathMatch: 'full' },
{path: 'browse', component: BrowseComponent}, 
{path:'main', component: MainComponent},
{path: 'auth', component: AuthComponent},
{path: 'orders', component: OrdersComponent, canActivate: [LoginAuthguardService]},
{path: 'items', component: ItemsComponent, canActivate: [AuthguardService]},
{path: 'adminorders', component: AdminordersComponent, canActivate: [AuthguardService]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
