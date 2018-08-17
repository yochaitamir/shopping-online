import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {Customers} from "./Customers"

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  //public newRegistrant:Customers
 
  
  constructor(private http: Http) { }
  signin(customer): Observable<Response> {
    
    return this.http.post('http://localhost:8080/signin',customer);
    
}

register(customer):Observable<Response> {
  // this.newRegistrant=CUSTOMER;
  // CUSTOMER.id=customer.id ;
  // CUSTOMER.email=customer.email;
  // CUSTOMER.password=customer.password;
  
     
  return this.http.post('http://localhost:8080/register',customer);
  
}
compregistered(customer):Observable<Response> {
  
  
  
 return this.http.post('http://localhost:8080/compregister',customer);
 
}
getUserDetails():Observable<Response>{
  return this.http.get('http://localhost:8080/getDetails');
}
getCategories():Observable<Response>{
  return this.http.get('http://localhost:8080/getCategories');
}
getProductsInCategory(categoryId):Observable<Response>{
  return this.http.get('http://localhost:8080/getProductsInCategory/'+categoryId);
}
startShopping():Observable<Response>{
  return this.http.post('http://localhost:8080/startshopping',null)
}
checkforopencart():Observable<Response>{
  return this.http.get('http://localhost:8080/checkforopencart')
}
addToCart(product):Observable<Response>{
  return this.http.post('http://localhost:8080/addproduct',product)

}
getCart():Observable<Response>{
  return this.http.get('http://localhost:8080/getcart')
}
deleteProduct(product):Observable<Response>{
  
return this.http.delete('http://localhost:8080/deleteproduct/'+product.productId)


}
getCustomerDetails():Observable<Response>{
  return this.http.get('http://localhost:8080/getcustomerdetails')
}
setOrder(orderDetails):Observable<Response>{
  return this.http.post('http://localhost:8080/setorder',orderDetails)
}
getDialogQuantity(productId):Observable<Response>{
  return this.http.get('http://localhost:8080/getproductquantity/'+productId)

}
}

