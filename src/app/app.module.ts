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
import { RouteComponent } from './route/route.component';
import {GetDataService} from './get-data.service';
import { RegcompComponent } from './regcomp/regcomp.component'
import {Observable} from "rxjs";
import { QuantityComponent } from './quantity/quantity.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    RegisterComponent,
    RouteComponent,
    RegcompComponent,
    QuantityComponent
  ],
  imports: [
    
    FormsModule,
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MatDialogModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot([
      {
          path: '',
          component: RegisterComponent,
          children: [
              {
                  path: 'edit/:id',
                  component: RouteComponent
              },
          //     {
          //         path: "xyz",
          //         redirectTo: "/add",
          //         pathMatch: 'prefix'
          //     }
           ]
      },
      {
          path: 'customer',
          component: CustomerComponent
      }
      // {
      //     path: 'editbr/:id',
      //     component: EditProductBrowserComponent
      // },
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
