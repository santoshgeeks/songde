import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-profile-receiving-business-enquireies',
  templateUrl: './profile-receiving-business-enquireies.component.html',
  styleUrls: ['./profile-receiving-business-enquireies.component.scss']
})
export class ProfileReceivingBusinessEnquireiesComponent implements OnInit {
  businesEnquiries:any = []
  isSpinner=false
  constructor(
    private comService:CommonService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
  }
  listOfEnquiry:any=[]
  openPopUp(){
    this.getAllBusiness()
  }
  getEnquiry(){
    this.isSpinner = true
    this.selectedEnquiry=[]
    this.comService.enquiry().subscribe((res:any)=>{
      this.listOfEnquiry=res.results.artist_purpose
      if(res){
        for(let i=0; i<this.businesEnquiries.length; i++){
          for(let j=0; j<this.listOfEnquiry.length; j++){
            if(this.businesEnquiries[i].name==this.listOfEnquiry[j].name){
              this.businesEnquiries[i].isSelected=true
              this.selectedEnquiry.push(this.businesEnquiries[i])
            }
          }
        }
        console.log(this.businesEnquiries);
        this.isSpinner = false
      }
      console.log(this.listOfEnquiry);
    },error=>{
      this.isSpinner = false
      this._snackBar.open("Somthing went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  selectedEnquiry:any=[]
  checkedEnquiries(event: any, index: any,item:any) {
    console.log(event,index);
    console.log(event.target.checked);
    if(event.target.checked){
      this.selectedEnquiry.push(item)
    }else{
      console.log(item);
      let insideIndex=this.selectedEnquiry.indexOf(item.name)
      this.selectedEnquiry.splice(insideIndex,1)
    }
    console.log(this.selectedEnquiry);
  }
  getAllBusiness(){
    this.isSpinner = true
    this.comService.allBusiness().subscribe((res:any)=>{
      if(res){
        this.getEnquiry()
        this.businesEnquiries=res.results
        for(let i=0; i<this.businesEnquiries.length; i++){
          this.businesEnquiries[i]['isSelected']=false
        }
        console.log(this.businesEnquiries);
        this.isSpinner = false
      }
    }, error=>{
      this.isSpinner = false
        this._snackBar.open("Somthing went wrong", "Ok", {
          duration: 2000,
          panelClass: ['error']
        })
    })
  }
  saveChanges(){
    let purpose:any=[]
    this.isSpinner = true
    let data={edit:"enquiry_details",purpose:[]}
    for(let i=0; i<this.selectedEnquiry.length; i++){
      purpose.push(this.selectedEnquiry[i].name)
    }
    data.purpose=purpose
    this.comService.editEnquiry(data).subscribe((res:any)=>{
      console.log(res);
      if(res){
        this.getEnquiry()
        this.isSpinner = false
        this._snackBar.open("Updated/Added Successfully", "Ok", {
          duration: 2000,
          panelClass: ['success']
        })
      }
    },error=>{
      this.isSpinner = false
      this._snackBar.open("Somthing went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })

  }

  @Output() newItemEvent:any = new EventEmitter();
  @Input()  enquireiesSection:any
  hideUnHide() {
    if(this.enquireiesSection){
      this.enquireiesSection=false
    }else{
      this.enquireiesSection=true
    }
    console.log(this.enquireiesSection);
    
    let data={
      section:"Enquiries",
      action:this.enquireiesSection
    }
    this.newItemEvent.emit(data)
  }

}
