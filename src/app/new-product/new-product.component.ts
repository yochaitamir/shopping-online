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
  productId:number=null
  fileinvalid:string="please choose a file";
  editing:boolean=false;
  adding:boolean=false
  authorised:any;
  show:boolean;
  @ViewChild('f') form: any;
  @ViewChild('productimg') file;
  @ViewChild(AdminProductsComponent ) child;
  
  constructor(private getdata: GetDataService) { }
  
  ngOnInit() {
    this.validateIfManager();
    
  }
  validateIfManager(){
    this.getdata.valManager().subscribe(
      res=>{this.authorised=res.json();
       this.show=this.authorised.auth
        if(this.authorised.auth==true){
          
        }else{
          window.location.replace("/")
        }
      }
    )

  }
  addProduct(){
    

    if(this.fileToUpload){
    this.getdata.addNewProduct(this.newproduct).subscribe(
      res=>{console.log(res)
        this.uploadFile();
        }
    )
  }else{
    this.fileinvalid="please choose a file"
  }
    

  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload)
    this.fileinvalid="";
}
  uploadFile(){
    // formData = new FormData();
    // this.formData.append('upload', this.fileToUpload, this.fileToUpload.name);
    // console.log(this.formData)
    this.getdata.upload(this.fileToUpload).subscribe(
      res=>{console.log(res)
        this.child.refreshProducts();
        this.file.nativeElement.value = "";
        this.newproduct=new Product
      }
    )
  }
  onEditing(product:Product){
    this.editing=true;
    this.adding=false
    this.fileinvalid="you may edit the file"
    this.newproduct=product
    
  }
  addProductbut(){
    this.newproduct=new Product;
    this.fileToUpload=null;
    this.adding=true
    this.editing=false;
    this.fileinvalid="please choose a file"
  }
  updateProduct(){
    this.getdata.updateProduct(this.newproduct).subscribe(
      res=>{console.log(res)
        this.updateUpload();
        }
    )
  }
  updateUpload(){
    if(this.fileToUpload){
    this.getdata.updateUpload(this.fileToUpload,this.newproduct.id).subscribe(
      res=>{console.log(res)
        this.refresh()
        
        this.file.nativeElement.value = "";
        this.newproduct=new Product;
        this.fileToUpload=null;

      }
    )
  }
  }
  refresh(){
    this.child.refreshProducts();
  }
  


}
