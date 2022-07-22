import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-profile-in-press',
  templateUrl: './profile-in-press.component.html',
  styleUrls: ['./profile-in-press.component.scss']
})
export class ProfileInPressComponent implements OnInit {

  inpress = [
    {
      heading: "The New Star  in born",
      details: "Stuck in our homes, we have all faced solitude and darkness. When the whole world stopped in 2020, music was still being created. So we decided to bring to you a plethora of echoes and chords which shed a ray of hope, give you perspective and keep company in these times. Look out for these meaningful music videos on Songdew TV, as we handpicked the best of 2020 for you.",
      byTheDate: "Apr 30, 2021",
      by: "by The Guardian"
    },
    {
      heading: "The New Star  in born",
      details: "When the whole world stopped in 2020, music was still being created. So we decided to bring to you a plethora of echoes and chords which shed a ray of hope, give you perspective and keep company in these times, and chords which shed a ray of hope, give you perspective and keep company in these times. ",
      byTheDate: "Apr 23, 2021",
      by: "by The Rolling Stones"
    },
  ]
  isSpinner=false
  inPressForm: FormGroup | any;
  inPressItems: FormArray | any;
  constructor(private formBuilder: FormBuilder, private comService: CommonService,private _snackBar:MatSnackBar) { }
  isChangedBlock: any
  ngOnInit(): void {
    this.createForm()
    this.getPressDetails()
    let a:any=[1,2,3,1,2,3,2,3,4,3,2,4]
    var b:any={}
    for(let i=0; i<a.length; i++){
      if(!b[a[i]]){
        b[a[i]]=0
      }
      ++b[a[i]]
    }
    console.log(b);
    
  }
  createForm() {
    this.inPressForm = new FormGroup({
      items: new FormArray([])
    });
  }

  editPress = {
    publisher: "",
    article_id: "",
    status: false
  }
  edit(item: any) {
    this.editPress.article_id = item.id,
      this.editPress.publisher = item.publisher,
      this.editPress.status = item.status
  }
  editAchivments() {
    this.createForm()
    console.log(this.inPressForm.value);
    let formArray: any = this.inPressForm.get("items") as FormArray;
    console.log(this.inPressForm.get("items").value = []);
    if (this.inPressItems)
      for (let i = 0; i < this.inPressItems.length; i++) {
        this.inPressItems.removeAt(0)
      }


    console.log(this.pressArtical);
    for (let i = 0; i < this.pressArtical.length; i++) {
      this.addInPressArtical()
      formArray.at(i).get("published_date").setValue(this.pressArtical[i].published_date)
      formArray.at(i).get('published_date').updateValueAndValidity()
      formArray.at(i).get("publisher").setValue(this.pressArtical[i].publisher)
      formArray.at(i).get('publisher').updateValueAndValidity()
      formArray.at(i).get("title").setValue(this.pressArtical[i].title)
      formArray.at(i).get('title').updateValueAndValidity()
      formArray.at(i).get("article_link").setValue(this.pressArtical[i].article_link)
      formArray.at(i).get('article_link').updateValueAndValidity()
      formArray.at(i).get("article").setValue(this.pressArtical[i].article)
      formArray.at(i).get('article').updateValueAndValidity()
      formArray.at(i).get("status").setValue(this.pressArtical[i].status)
      formArray.at(i).get('status').updateValueAndValidity()
      formArray.at(i).get("id").setValue(this.pressArtical[i].id)
      formArray.at(i).get('id').updateValueAndValidity()
    }
    // this.listOfAchivement=[]
  }
  editInPress() {
    this.isSpinner=true
    this.comService.editInPress(this.editPress).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.getPressDetails()
        this.isSpinner=false
        this._snackBar.open("Updated/Added success fully", "Ok", {
          duration: 2000,
          panelClass: ['success']
        })
      }
    },err=>{
      this.isSpinner=false
      this._snackBar.open("Somthing went worong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  pressArtical: any = []
  getPressDetails() {
    this.isSpinner=true
    this.comService.press().subscribe((res: any) => {
    if(res){
      this.pressArtical = res.results
      // console.log(this.pressArtical);
      this.isSpinner=false
    }
    },err=>{
      this.isSpinner=false
      this._snackBar.open("Somthing went worong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  addInPressArtical(): void {
    this.inPressItems = this.inPressForm.get('items') as FormArray;
    this.inPressItems.push(this.createInPressArtical());
  }

  deleteArticale(index: any) {
    this.inPressItems.removeAt(index)
  }

  createInPressArtical(): FormGroup {
    return this.formBuilder.group({
      published_date: '',
      publisher: '',
      title: '',
      article_link: '',
      article: '',
      status: true,
      id:""
    });
  }
  saveChanges() {
    this.isSpinner=true
    console.log(this.inPressForm.value.items[0]);
    let temJson = {
      press_articles: this.inPressForm.value.items
    }

    this.comService.addInPress(temJson).subscribe((res: any) => {
     if(res){
      this.getPressDetails()
      this.inPressForm.reset()
      this.createForm()
      this.isSpinner=false
      this._snackBar.open("Updated/Added successfully", "Ok", {
        duration: 2000,
        panelClass: ['success']
      })
     }
    },err=>{
      this.isSpinner=false
      this._snackBar.open("Somthing went worong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  @Output() newItemEvent:any = new EventEmitter();
  @Input()  pressSection:any
  hideUnHide() {
    if(this.pressSection){
      this.pressSection=false
    }else{
      this.pressSection=true
    }
    console.log(this.pressSection);
    
    let data={
      section:"Press",
      action:this.pressSection
    }
    this.newItemEvent.emit(data)
  }
}
