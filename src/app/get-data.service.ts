import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {HttpClient} from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Customers} from "./Customers"
import 'rxjs/add/operator/map'
@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  //public newRegistrant:Customers
 
  
  constructor(private http: Http, private httpclient:HttpClient) { }
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
valManager():Observable<Response> {
  
  
  
  return this.http.get('http://localhost:8080/checkifadmin');
  
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
addNewProduct(newproduct):Observable<Response>{
  return this.http.post('http://localhost:8080/addnewproduct',newproduct)
}
upload(fileToUpload: File): Observable<any> {
  
  let formData = new FormData();
  formData.append('fileKey', fileToUpload, fileToUpload.name);
  console.log(fileToUpload)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'image/jpg',
      
    })
  };
  return this.httpclient.post('http://localhost:8080/upload',formData
    
  )
}
updateProduct(editedproduct):Observable<Response>{
  return this.http.put('http://localhost:8080/updateproduct/'+editedproduct.id,editedproduct)
}
updateUpload(fileToUpload: File,prodectId){

  let formData = new FormData();
  formData.append('fileKey', fileToUpload, fileToUpload.name);
  console.log(fileToUpload)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'image/jpg',
      
    })
  };
  return this.httpclient.put('http://localhost:8080/updateupload/'+prodectId,formData
    
  )
}
getUnavailDates():Observable<Response>{
  return this.http.get('http://localhost:8080/getunavailabledates')
}
}
