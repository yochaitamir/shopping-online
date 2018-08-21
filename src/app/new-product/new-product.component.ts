import { Component, OnInit,ViewChild } from '@angular/core';
import { GetDataService } from '../get-data.service'
import { Product } from '../product';
import {AdminProductsComponent} from '../admin-products/admin-products.component'


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  newproduct:Product=new Product;
  fileToUpload:File=null;
 
  
  @ViewChild('f') form: any;
  @ViewChild('productimg') file;
  @ViewChild(AdminProductsComponent ) child;
  constructor(private getdata: GetDataService) { }
  
  ngOnInit() {
    
  }
  
  addProduct(){
    

    //this.newproduct.imageUrl=this.file
    this.getdata.addNewProduct(this.newproduct).subscribe(
      res=>{console.log(res)
        this.uploadFile();
        this.child.refreshProducts();}
    )
    

  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload)
}
  uploadFile(){
    // formData = new FormData();
    // this.formData.append('upload', this.fileToUpload, this.fileToUpload.name);
    // console.log(this.formData)
    this.getdata.upload(this.fileToUpload).subscribe(
      res=>console.log(res)
    )
  }
  


}
