import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { Http, Response } from '@angular/http';
import { HttpModule } from '@angular/http';

import { CustomerComponent } from './customer/customer.component';
import { RegisterComponent } from './register/register.component';
import {GetDataService} from './get-data.service';
import { RegcompComponent } from './regcomp/regcomp.component'
import {Observable} from "rxjs";
import { QuantityComponent } from './quantity/quantity.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatDialogModule} from '@angular/material/dialog';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { NewProductComponent } from './new-product/new-product.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductsAdminComponent } from './products-admin/products-admin.component'
@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    RegisterComponent,
    RegcompComponent,
    QuantityComponent,
    OrderCartComponent,
    OrderdetailsComponent,
    NewProductComponent,
    AdminProductsComponent,
    ProductsAdminComponent,
    

  ],
  imports: [
    
    FormsModule,
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot([
      {
          path: '',
          component: RegisterComponent,
        //   children: [
        //       {
        //           path: 'edit/:id',
        //           component: RouteComponent
        //       },
          //     {
          //         path: "xyz",
          //         redirectTo: "/add",
          //         pathMatch: 'prefix'
          //     }
           //]
      },
      {
          path: 'customer',
          component: CustomerComponent
      },
      {
        path: 'admin',
        component: NewProductComponent
    },
      {
          path: 'cartOrder',
          component: OrderCartComponent
      },
      // {
      //     path: '',
      //     redirectTo: "report",
      //     pathMatch:'full'
      // }
  ], { enableTracing: false })
  ],
  providers: [GetDataService],
  bootstrap: [AppComponent],
  entryComponents: [QuantityComponent]
})
export class AppModule { }
