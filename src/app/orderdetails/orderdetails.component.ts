import { Component, OnInit ,ViewChild,Input} from '@angular/core';
import { NgModule } from '@angular/core';
import { GetDataService } from '../get-data.service'
import { Orderdet } from '../orderdet';
import { Customers } from "../Customers"
@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  @Input() totalPrice: number;
  orderDetails:Orderdet=new Orderdet;
  @ViewChild('f') form: any;
  customerDetails: Customers = new Customers;
  cusDetails:any;
  checkout:any;
  datefullerr:string;
  pastDate:string;
  pastdate:any;
  creditCard:any;
  receipt:boolean=false;
  constructor(private getdata: GetDataService) { }

  ngOnInit() {
    console.log(this.orderDetails.orderDate)
    this.orderDetails.orderDate=null;
  }
  getStreet(){
  this.getdata.getCustomerDetails().subscribe(
    res=>{this.cusDetails=res.json()
      this.orderDetails=this.cusDetails[0]
      this.orderDetails.price=this.totalPrice}
  )
}
valiDate(idate){
  let today = new Date()
  today.setHours(-24);
  today.setMinutes(0);
  today.setSeconds(0);

  let daystart = today.getTime();
  let valdate = idate.split("-");
  console.log(today)
  console.log(valdate)
  let validate = new Date(valdate[0], valdate[1]-1 , valdate[2]).getTime();
  console.log(validate)
  console.log(daystart)
  if( (daystart - validate) < 0){
   this.pastdate=true;
}else{
  this.pastdate=false;
  
}
}
setOrder(){
  //if(this.valiDate(this.orderDetails.orderDate)){
  this.getdata.setOrder(this.orderDetails).subscribe(
    res=>{this.checkout=res.json();
      console.log(res);
      if(this.checkout.datefull==true){
        this.datefullerr="this date is full please choose another date"
      }else if(this.checkout.datefull==false){
        this.receipt=true;
        this.datefullerr="your order is on its way,thankyou and come again"
      }else if(this.checkout.datefull=="interaction completed")
      {this.datefullerr=this.checkout.datefull;
    }}
  )

}
// else{
//   this.datefullerr="you have to enter future date"
// }
//}
}