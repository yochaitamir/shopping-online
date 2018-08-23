import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service'
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  cartproducts:any;
  total:number;
  subtotal:number;
  searchincart:string;
  productname:string;
  searchincartst:string;
  showbutton:boolean=true;
  constructor(private getdata: GetDataService) { }

  ngOnInit() {
  }
  watchReceipt(){
    this.showbutton=false
    this.getCart()
  }
  getCart(){
    let cart = this.getdata.getCart()
    cart.subscribe(res => {
        this.cartproducts=res.json()
        console.log(this.cartproducts)
        this.totaleprice(this.cartproducts)
    },
        e => console.log(e))
}
totaleprice(cartproducts){
    this.total=0;
    for (let price of cartproducts) {
        console.log(price.quantity)
    this.subtotal=price.price*price.quantity;
    this.total=this.total+this.subtotal;
}
}

}
