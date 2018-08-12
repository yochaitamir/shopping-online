import { Component, OnInit, Input,ViewChild } from '@angular/core';
import {Observable} from "rxjs";
import * as $ from 'jquery';
import {Customers} from "../Customers"
import {GetDataService} from '../get-data.service'

@Component({
  selector: 'app-regcomp',
  templateUrl: './regcomp.component.html',
  styleUrls: ['./regcomp.component.css']
})
export class RegcompComponent implements OnInit {
  
  @ViewChild('f') form: any;
  constructor(private getdata: GetDataService) { }
  //compregister():any{
      
    
    // .subscribe(
    //   res => {
          
    //   this.valid=res.json();
    //   //this.custdet=this.form.value
      // console.log(CUSTOMER)
    //window.location.replace("/regcomp")     
      
      //}); 
    //}
    //if(this.form.valid){
    // this.compregister
  
 
  ngOnInit() {
    

    
    
  }

}
