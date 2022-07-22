import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName=""
  password=""
  constructor(private comService: CommonService, private router: Router){

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   
    
  }
  login(){
    let tempJson={
      email: this.userName,
      password: this.password,
      source: 'web',
  }
    this.comService.login(tempJson).subscribe((res:any)=>{
      console.log(res);
     
      if(res){
        sessionStorage.setItem("user",JSON.stringify(res))
        this.router.navigateByUrl("profile")
      }
    })
  }

}
