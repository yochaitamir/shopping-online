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
import { GetDataService } from './get-data.service';

import { Observable } from "rxjs";
import { QuantityComponent } from './quantity/quantity.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDialogModule } from '@angular/material/dialog';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { NewProductComponent } from './new-product/new-product.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { HttpClientModule } from '@angular/common/http';

import { ReceiptComponent } from './receipt/receipt.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    RegisterComponent,

    QuantityComponent,
    OrderCartComponent,
    OrderdetailsComponent,
    NewProductComponent,
    AdminProductsComponent,

    ReceiptComponent,


  ],
  imports: [

    FormsModule,
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,

    MatInputModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: RegisterComponent,

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
      }, {
        path: 'receipt',
        component: ReceiptComponent
      }

    ], { enableTracing: false })
  ],
  providers: [GetDataService],
  bootstrap: [AppComponent],
  entryComponents: [QuantityComponent]
})
export class AppModule { }
