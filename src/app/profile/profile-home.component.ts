import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss']
})
export class ProfileHomeComponent implements OnInit {

  listofHidenSection:any=[]
  constructor(
    private comService: CommonService,
    private _snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getSection()
    let a:any=[1,[2,3],[1,3,5,4]];
    let b=[].concat(...a)
    console.log(b);
    let set =new Set(b)
    console.log(set);
    
    
    this.flatArray(a, 2)
  }

  flatArray(a:any, depth:any):any{
    let rslt:any=[]
   let flat= a.forEach((arr:any) => {
      if(Array.isArray(arr) && depth>0){
       return rslt.push(...this.flatArray(arr,depth-1))
      }else{
        return rslt.push(arr)
      }
    });

    console.log(flat);
    

  }






  hindUnhide(event:any){
    console.log(event);
    this.hideUnhideSection(event)
    
  }
 
  hideUnhideSection(event:any) {
    let data = {
      "section": event.section,
      "action": event.action
    }
   
    this.comService.hideSection(data).subscribe((res: any) => {
      if (res) {
        if(event.action){
          this._snackBar.open( event.section+" "+"Hidden Successfully", "Ok", {
            duration: 2000,
            panelClass: ['success']
          })
        }else{
          this._snackBar.open(event.section+" "+"Unhidden Successfully", "Ok", {
            duration: 2000,
            panelClass: ['success']
          })
        }
       this.getSection()
      }
    }, error => {
      this.isSpinner = false
      this._snackBar.open(error.error, "Ok", {
        duration: 20000,
        panelClass: ['error']
      })
    })
  }

  isSpinner=false
  aboutSection:boolean=false
  achivemnetSection:boolean=false
  enquireiesSection:boolean=false
  musicarea:boolean=false
  photosSection:boolean=false
  quoteSection:boolean=false
  LivePerformanceSection:boolean=false
  pressSection:boolean=false
  AssetsSection:boolean=false
  videoSection:boolean=false
    getSection() {
      this.isSpinner = true
      this.comService.getAllsetion().subscribe((res: any) => {
        console.log(res);
        if (res) {
          this.listofHidenSection = res.data
         let aboutSection= this.listofHidenSection.find((o:any) => o.section === 'About');
         if(aboutSection!=undefined){
          this.aboutSection=aboutSection.action
         }else{
          this.aboutSection=false
         }
         let achivemnetSection= this.listofHidenSection.find((o:any) => o.section === "Achievement");
         if(achivemnetSection!=undefined){
          this.achivemnetSection=achivemnetSection.action
         }else{
          this.achivemnetSection=false
         }
         let enquireiesSection= this.listofHidenSection.find((o:any) => o.section === "Enquiries");
         if(enquireiesSection!=undefined){
          this.enquireiesSection=enquireiesSection.action
         }else{
          this.enquireiesSection=false
         }
         let musicarea= this.listofHidenSection.find((o:any) => o.section === "Music");
         if(musicarea!=undefined){
          this.musicarea=musicarea.action
         }else{
          this.musicarea=false
         }
         let photosSection= this.listofHidenSection.find((o:any) => o.section === "Photos");
         if(photosSection!=undefined){
          this.photosSection=photosSection.action
         }else{
          this.photosSection=false
         }
         let quoteSection= this.listofHidenSection.find((o:any) => o.section === "Quote");
         if(quoteSection!=undefined){
          this.quoteSection=quoteSection.action
         }else{
          this.quoteSection=false
         }
         let LivePerformanceSection= this.listofHidenSection.find((o:any) => o.section === "LivePerformance");
         if(LivePerformanceSection!=undefined){
          this.LivePerformanceSection=LivePerformanceSection.action
         }else{
          this.LivePerformanceSection=false
         }
         let pressSection= this.listofHidenSection.find((o:any) => o.section === "Press");
         if(pressSection!=undefined){
          this.pressSection=pressSection.action
         }else{
          this.pressSection=false
         }
         let AssetsSection= this.listofHidenSection.find((o:any) => o.section === "Assets");
         if(AssetsSection!=undefined){
          this.AssetsSection=AssetsSection.action
         }else{
          this.AssetsSection=false
         }
         let videoSection= this.listofHidenSection.find((o:any) => o.section === "Video");
         if(videoSection!=undefined){
          this.videoSection=videoSection.action
         }else{
          this.videoSection=false
         }
         this.isSpinner=false
        }
        
      }, error=>{
        this.isSpinner=false
        this._snackBar.open(error.error, "Ok", {
          duration: 20000,
          panelClass: ['error']
        })
      })
    }

  }

