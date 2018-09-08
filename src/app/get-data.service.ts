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
 
 
  
  constructor(private http: Http, private httpclient:HttpClient) { }
  signin(customer): Observable<Response> {
    
    return this.http.post('/signin',customer);
    
}

register(customer):Observable<Response> {
 
  
     
  return this.http.post('/register',customer);
  
}
compregistered(customer):Observable<Response> {
  
  
  
 return this.http.post('/compregister',customer);
 
}
valManager():Observable<Response> {
  
  
  
  return this.http.get('/checkifadmin');
  
 }
getUserDetails():Observable<Response>{
  return this.http.get('/getDetails');
}
lastCart(){
  return this.http.get('/lastcart');
}
getCategories():Observable<Response>{
  return this.http.get('/getCategories');
}
getProductsInCategory(categoryId):Observable<Response>{
  return this.http.get('/getProductsInCategory/'+categoryId);
}
startShopping():Observable<Response>{
  return this.http.post('/startshopping',null)
}
checkforopencart():Observable<Response>{
  return this.http.get('/checkforopencart')
}
addToCart(product):Observable<Response>{
  return this.http.post('/addproduct',product)

}
getCart():Observable<Response>{
  return this.http.get('/getcart')
}
deleteProduct(product):Observable<Response>{
  
return this.http.delete('/deleteproduct/'+product.productId)


}
getCustomerDetails():Observable<Response>{
  return this.http.get('/getcustomerdetails')
}
setOrder(orderDetails):Observable<Response>{
  return this.http.post('/setorder',orderDetails)
}
getDialogQuantity(productId):Observable<Response>{
  return this.http.get('/getproductquantity/'+productId)

}
addNewProduct(newproduct):Observable<Response>{
  return this.http.post('/addnewproduct',newproduct)
}
upload(fileToUpload: File): Observable<any> {
  
  let formData = new FormData();
  formData.append('fileKey', fileToUpload, fileToUpload.name);
  
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'image/jpg',
      
    })
  };
  return this.httpclient.post('/upload',formData
    
  )
}
updateProduct(editedproduct):Observable<Response>{
  return this.http.put('/updateproduct/'+editedproduct.id,editedproduct)
}
updateUpload(fileToUpload: File,prodectId){

  let formData = new FormData();
  formData.append('fileKey', fileToUpload, fileToUpload.name);
  
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'image/jpg',
      
    })
  };
  return this.httpclient.put('/updateupload/'+prodectId,formData
    
  )
}
getUnavailDates():Observable<Response>{
  return this.http.get('/getunavailabledates')
}
getAllProducts(){
  return this.http.get('/getproducts')
}
emptyCart(){
  return this.http.delete('/emptycart')
}
logOut(){
  return this.http.post('/logout',null)
}
}
