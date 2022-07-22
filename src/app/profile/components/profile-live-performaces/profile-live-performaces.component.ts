import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from "moment";
@Component({
  selector: 'app-profile-live-performaces',
  templateUrl: './profile-live-performaces.component.html',
  styleUrls: ['./profile-live-performaces.component.scss']
})
export class ProfileLivePerformacesComponent implements OnInit {

  liveperformancetForm: FormGroup | any;
  liveperformanceItems: FormArray | any;
  livePerformance = [
    { day: 30, month: "Apr", eventName: "Springfest  LLT Kharagput", place: "Kharagput, India", year: "2021" },
    { day: 21, month: "Apr", eventName: "NH7 Weekender fest", place: "Bangalore, India", year: "2021" },
    { day: 16, month: "Mar", eventName: "Automation India Expo 2021", place: "Mumbai, India", year: "2021" },
    { day: 20, month: "Jan", eventName: "India Internet Day", place: "Gurgaon, India", year: "2021" },
    { day: 24, month: "Nov", eventName: "India Manufacturing Show", place: "Bangalore, India", year: "2020" }
  ]
  isSpinner = false
  constructor(private formBuilder: FormBuilder, private comService: CommonService,
    private _snackBar: MatSnackBar,
    private DatePipe: DatePipe
  ) { }
  pageForLivePer = {
    limit: 6,
    pageNo: 0
  }
  createForm() {
    this.liveperformancetForm = new FormGroup({
      items: new FormArray([])
    });
  }
  ngOnInit(): void {
    this.createForm()
    this.getLivePerformence(this.pageForLivePer)
    this.getCountry()
  }
  listOfLivePerformence: any = []
  format(date: Date, displayFormat: Object): string {
    // use what format you need
    return moment(date).format('DD MMM');
  }
  getLivePerformence(pageData: any) {
    this.isSpinner = true
    this.comService.livePerformence(pageData).subscribe((res: any) => {
      if (res) {
        this.listOfLivePerformence = res.data
        // this.addExisting()
        this.total = res.total
        // console.log(this.listOfLivePerformence);
        this.isSpinner = false
      }
    }, error => {
      this.isSpinner = false
      this._snackBar.open("Somthing went worng", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }

  addExisting() {
    this.createForm()
    console.log(this.listOfLivePerformence);
    let formArray: any = this.liveperformancetForm.get("items") as FormArray;
    if (this.liveperformanceItems)
      for (let i = 0; i < this.liveperformanceItems.length; i++) {
        this.liveperformanceItems.removeAt(i)
      }

    console.log(this.liveperformanceItems);

    // this.liveperformanceItems=[]
    for (let i = 0; i < this.listOfLivePerformence.length; i++) {
      this.addLivePerformance()
      formArray.at(i).get('performance_date').setValue(
        this.DatePipe.transform(this.listOfLivePerformence[i].performance_date, 'yyyy-MM-dd')
      )
      formArray.at(i).get('performance_date').updateValueAndValidity()
      formArray.at(i).get('country').setValue(this.listOfLivePerformence[i].country)
      formArray.at(i).get('country').updateValueAndValidity()
      formArray.at(i).get('venue').setValue(this.listOfLivePerformence[i].venue)
      formArray.at(i).get('venue').updateValueAndValidity()
      formArray.at(i).get('title').setValue(this.listOfLivePerformence[i].title)
      formArray.at(i).get('title').updateValueAndValidity()
      formArray.at(i).get('performance_type').setValue(this.listOfLivePerformence[i].performance_type)
      formArray.at(i).get('performance_type').updateValueAndValidity()
      formArray.at(i).get('id').setValue(this.listOfLivePerformence[i].id)
      formArray.at(i).get('id').updateValueAndValidity()
      formArray.at(i).get('status').setValue(this.listOfLivePerformence[i].status)
      formArray.at(i).get('status').updateValueAndValidity()
      formArray.at(i).get('priority').setValue(this.listOfLivePerformence[i].priority)
      formArray.at(i).get('priority').updateValueAndValidity()
    }
  }
  addLivePerformance(): void {
    this.liveperformanceItems = this.liveperformancetForm.get('items') as FormArray;
    this.liveperformanceItems.push(this.createLivePerformance());

  }
  createLivePerformance(): FormGroup {
    return this.formBuilder.group({
      performance_date: [""],
      country: [''],
      priority: "2",
      status: true,
      venue: [''],
      title: [''],
      performance_type: [""],
      id: [""]
    });
  }
  pageSize = 6
  p: any = 1
  total = 0
  deleteLivePEvent(index: any) {
    this.liveperformanceItems.removeAt(index)
  }

  pageChanged(event: any) {
    console.log(event);
    this.p = event
    this.pageForLivePer.pageNo = event - 1
    this.pageForLivePer.limit = 6
    this.getLivePerformence(this.pageForLivePer)

  }
  listofCountry: any = []
  getCountry() {
    this.isSpinner = true
    this.comService.getCountry().subscribe((res: any) => {
      // console.log(res);
      this.listofCountry = res
      if (res) {
        this.isSpinner = false
      }
    })
  }
  reset() {
    this.liveperformancetForm.reset()
    this.createLivePerformance()
    let form = this.liveperformancetForm.get('items') as FormArray;
    if (form.length > 0) {
      for (let i = 0; i < form.length; i++) {
        this.deleteLivePEvent(i)
      }
    }

  }
  saveChanges() {
    this.isSpinner = true
    let allItems: any = this.liveperformancetForm.value.items
    console.log(allItems);
    this.pageForLivePer.limit = 6,
      this.pageForLivePer.pageNo = 0
    let data = {
      performances: allItems
    }
    this.comService.addLivePerEvent(data).subscribe((res: any) => {
      if (res) {
        this.getLivePerformence(this.pageForLivePer)
        this.isSpinner = false
        this._snackBar.open("Added success fully", "Ok", {
          duration: 2000,
          panelClass: ['success']
        })
      }
    }, error => {
      this.isSpinner = false
      this._snackBar.open("Something went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  editLivePerf: any = {
    performance_date: "",
    title: "",
    venue: "",
    performance_type: "",
    "status": false,
    "priority": 1,
    id: null
  }
  updateLivePerf() {
    this.isSpinner = true
    let tempDate = new Date(this.editLivePerf.performance_date).toISOString()
    this.editLivePerf.performance_date = tempDate
    this.comService.updateLivePerformence(this.editLivePerf).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.isSpinner = false
        this.createForm()
        this._snackBar.open("Updated Successfully", "Ok", {
          duration: 2000,
          panelClass: ['success']
        })
      }
      if (res) {
        this.pageForLivePer.pageNo = this.p - 1
        this.getLivePerformence(this.pageForLivePer)
        this.pageChanged(this.p)
      }
    })
  }
  deletePerformance(item: any) {
    this.isSpinner = true
    this.editLivePerf.performance_date = new Date(item.performance_date).toISOString()
    this.editLivePerf.title = item.title
    this.editLivePerf.venue = item.venue
    this.editLivePerf.performance_type = item.performance_type
    this.editLivePerf.status = false
    this.editLivePerf.priority = item.priority
    this.editLivePerf.id = item.id
    this.comService.updateLivePerformence(this.editLivePerf).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.pageForLivePer.pageNo = 0
        this.getLivePerformence(this.pageForLivePer)
        this.isSpinner = false
        this._snackBar.open("Deleted Successfully", "Ok", {
          duration: 2000,
          panelClass: ['success']
        })
        // this.pageChanged(this.p)
      }
    })
  }
  editPerformence(item: any) {
    console.log(item);

    this.editLivePerf.performance_date = this.DatePipe.transform(item.performance_date, 'yyyy-MM-dd')
    // new Date(item.performance_date).toISOString()
    this.editLivePerf.title = item.title
    this.editLivePerf.venue = item.venue
    this.editLivePerf.performance_type = item.performance_type
    this.editLivePerf.status = item.status
    this.editLivePerf.priority = item.priority
    // this.editLivePerf.user=item.user
    this.editLivePerf.id = item.id
  }
  @Output() newItemEvent:any = new EventEmitter();
  @Input()  LivePerformanceSection:any
  hideUnHide() {
    if(this.LivePerformanceSection){
      this.LivePerformanceSection=false
    }else{
      this.LivePerformanceSection=true
    }
    console.log(this.LivePerformanceSection);
    
    let data={
      section:"LivePerformance",
      action:this.LivePerformanceSection
    }
    this.newItemEvent.emit(data)
  }
}
