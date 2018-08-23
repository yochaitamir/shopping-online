import { Component } from '@angular/core';
import { GetDataService } from './get-data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userdetails:any
  name:string;
  email:string;
  constructor(private getdata: GetDataService) { }
  ngOnInit() {
    this.userDetails();
    }
    userDetails(){
      this.userdetails=this.getdata.getUserDetails()
      this.userdetails.subscribe(res=>{
        if(res.json().loggedin==true){
          this.name=undefined
        }else{
        this.name=res.json().name;
        this.email=res.json().email;
        }
      })
    }
}
