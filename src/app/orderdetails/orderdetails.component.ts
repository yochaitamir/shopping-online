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
  constructor(private getdata: GetDataService) { }

  ngOnInit() {
    console.log(this.orderDetails.orderDate)
  }
  getStreet(){
  this.getdata.getCustomerDetails().subscribe(
    res=>{this.cusDetails=res.json()
      this.orderDetails=this.cusDetails[0]
      this.orderDetails.price=this.totalPrice}
  )
}
setOrder(){
  this.getdata.setOrder(this.orderDetails).subscribe(
    res=>console.log(res)
  )

}
}