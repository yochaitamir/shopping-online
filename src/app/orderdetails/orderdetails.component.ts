import { Component, OnInit ,ViewChild,Input} from '@angular/core';
import { NgModule } from '@angular/core';
import { GetDataService } from '../get-data.service'
import { Orderdet } from '../orderdet';
import { Customers } from "../Customers"
import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';

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
  unavailableDates:Array<any>
  nonAvailableDates:Array<any>=[]
  datefor:Array<any>
  dmy:string;
  orderDate1:string;
  datefortrans:Array<any>
  //date:Date=new Date('2018-08-27T00:00:00+01:00');
  constructor(private getdata: GetDataService) { }
  
  
  ngOnInit() {
    console.log(this.orderDetails.orderDate)
    this.orderDetails.orderDate=null;
    //this.getUnavailDates();

   this.getUnavailDates();
   this.datepicker()
   //this.nonavail(this.unavailableDates)
   
  }
  
 
nonavail(arr):any  {
  

  
      var obj = {};
      
      for(var i= 0, l = arr.length; i< l; i++){
          var item = arr[i].orderDate;
          obj[item] = (obj[item] +1 ) || 1;
      }
      for (let [key, value] of Object.entries(obj)) {  
        if(value){
          
          let d=this.nonAvailableDates.push(key)
        }
        console.log(this.nonAvailableDates);
        
      }
      
  
}
 unavailable(date) {
  console.log(this.nonAvailableDates);
  
  this.dmy = date.getFullYear() + "-0" + (date.getMonth()-1 ) + "-" + date.getDate()+"T21:00:00.000Z";
  console.log(this.dmy)
  if ($.inArray(this.dmy, this.nonAvailableDates) == -1) {
      return [true, ""];
  } else {
      return [false, "", "Unavailable"];
  }
}
datepicker(){
  $("#shippingdate").datepicker({
      dateFormat: 'yy mm dd',
      beforeShowDay: this.unavailable.bind(this),
      minDate:0,
      
  });

}

  
  getDet(){
  this.getdata.getCustomerDetails().subscribe(
    res=>{this.cusDetails=res.json()
      this.orderDetails=this.cusDetails[0]
      this.orderDetails.price=this.totalPrice}
  )
}
// valiDate(idate){
//   let today = new Date()
//   today.setHours(-24);
//   today.setMinutes(0);
//   today.setSeconds(0);

//   let daystart = today.getTime();
//   let valdate = idate.split("-");
//   console.log(today)
//   console.log(valdate)
//   let validate = new Date(valdate[0], valdate[1]-1 , valdate[2]).getTime();
//   console.log(validate)
//   console.log(daystart)
//   if( (daystart - validate) < 0){
//    this.pastdate=true;
// }else{
//   this.pastdate=false;
  
// }
// }
setOrder(){
  //this.orderDetails.orderDate = $('#shippingdate').datepicker({ dateFormat: 'yy/mm/dd' }).val();
      let today=$( '#shippingdate ').datepicker( "getDate" )
    let ty=today.getFullYear();
   let tm=today.getMonth()+1;
    let td=today.getDate();
    this.orderDetails.orderDate=td+"/"+tm+"/"+ty
  console.log(this.orderDetails.orderDate)
  this.orderDetails.price=this.totalPrice;
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
getUnavailDates(){
  this.getdata.getUnavailDates().subscribe(res=>{this.unavailableDates = res.json()
    console.log(this.unavailableDates)
    this.nonavail(this.unavailableDates)})
}

}

