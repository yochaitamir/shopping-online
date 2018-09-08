import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { GetDataService } from '../get-data.service'
import { Product } from '../product';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  
})
export class AdminProductsComponent implements OnInit {
  categories:any;
  selectedcategory:any;
  productsInCategory:any;
  @Output() editing: EventEmitter<Product> = new EventEmitter<Product>();
  constructor(private getdata: GetDataService) {
    
   }

  ngOnInit() {
    this.getCategories()
   
  }
  getCategories() {
    this.getdata.getCategories().subscribe(
        res => this.categories = res.json()
    )
}
onSelect(category: any): void {
  this.selectedcategory = category;
  this.getdata.getProductsInCategory(this.selectedcategory.id).subscribe(
      res => {
      this.productsInCategory = res.json()
          
      }
  )

}
refreshProducts(){
  if(this.selectedcategory){
    
    this.onSelect(this.selectedcategory);
    }
}
editProduct(product:Product): void {
  this.editing.emit(product);
  
}

}
