import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service'

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.css']
})
export class OrderCartComponent implements OnInit {
cartproducts:any;
total:number;
subtotal:number;
searchincart:string;
productname:string;
searchincartst:string;
  constructor(private getdata: GetDataService) { }

  ngOnInit() {
    this.getCart()
  }
  getCart(){
    let cart = this.getdata.getCart()
    cart.subscribe(res => {
        this.cartproducts=res.json()
       
        this.totaleprice(this.cartproducts)
    },
        e => console.log(e))
}
totaleprice(cartproducts){
    this.total=0;
    for (let price of cartproducts) {
        
    this.subtotal=price.price*price.quantity;
    this.total=this.total+this.subtotal;
}
}
searchInCart(searchincart){
this.searchincartst=searchincart
  }
backToCart(){
  window.location.replace("/customer") 
}
}
