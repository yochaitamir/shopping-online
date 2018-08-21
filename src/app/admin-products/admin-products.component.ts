import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service'
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  
})
export class AdminProductsComponent implements OnInit {
  categories:any;
  selectedcategory:any;
  productsInCategory:any;
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
          console.log(this.productsInCategory)
      }
  )

}
refreshProducts(){
  if(this.selectedcategory){
    this.onSelect(this.selectedcategory);
    }
}

}
