import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-profile-chievements',
  templateUrl: './profile-chievements.component.html',
  styleUrls: ['./profile-chievements.component.scss']
})
export class ProfileChievementsComponent implements OnInit {
  achievements = [
    { winnerPosition: "Winner", disc: "Won Best Rock Band of the year waward in 2021" },
    { winnerPosition: "Nominated", disc: "Nominated for most promising emerging talent is Asia" },
    { winnerPosition: "Winner", disc: "Won Best  Music video for BLACK NIGHTS MTV in 2022" },
    { winnerPosition: "Winner", disc: "Winner of an international talent contest" }
  ]
  isSpinner=false
  achivmentForm: FormGroup | any;
  achivmentItems: FormArray | any;

  constructor(
    private formBuilder: FormBuilder,
    private comService: CommonService,
    private _snackBar: MatSnackBar
    
     ) { }
  page = 0
  createForm() {
    this.achivmentForm = new FormGroup({
      items: new FormArray([])
    });
  }
  ngOnInit(): void {
    this.createForm()
    this.getAchivements(this.page)
    let a      = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4];
    let result:any = { };
for(var i = 0; i < a.length; ++i) {
    if(!result[a[i]])
        result[a[i]] = 0;
    ++result[a[i]];
    console.log(this.achivemnetSection);
    
}
console.log(result);

  }
  isChangedBlock: any
  listOfAchivement: any = []
  getAchivements(page: any) {
    this.isSpinner = true
    this.comService.achievement(page).subscribe((res: any) => {
      if(res){
        this.isSpinner = false
        this.listOfAchivement = res.data
        console.log(this.listOfAchivement);
      }
    },error=>{
      this.isSpinner = false
      this._snackBar.open("Something went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  editAchivments() {
    this.createForm()
    console.log(this.achivmentForm.value);
    let formArray: any = this.achivmentForm.get("items") as FormArray;
    console.log(this.achivmentForm.get("items").value = []);
    if (this.achivmentItems)
      for (let i = 0; i < this.achivmentItems.length; i++) {
        this.achivmentItems.removeAt(0)
      }


    console.log(this.listOfAchivement);
    for (let i = 0; i < this.listOfAchivement.length; i++) {
      this.addAchivments()
      formArray.at(i).get("achievement_name").setValue(this.listOfAchivement[i].achievement_name)
      formArray.at(i).get('achievement_name').updateValueAndValidity()
      formArray.at(i).get("achievement_description").setValue(this.listOfAchivement[i].achievement_description)
      formArray.at(i).get('achievement_description').updateValueAndValidity()
      formArray.at(i).get("priority").setValue(this.listOfAchivement[i].priority)
      formArray.at(i).get('priority').updateValueAndValidity()
      formArray.at(i).get("id").setValue(this.listOfAchivement[i].id)
      formArray.at(i).get('id').updateValueAndValidity()
    }
    // this.listOfAchivement=[]
  }
  saveChanges() {
    console.log(this.achivmentForm.value);
    this.isSpinner = true
    let data = { achievements: this.achivmentForm.value.items }
    this.comService.addAchivements(data).subscribe((res: any) => {
      if (res.success) {
        this.listOfAchivement = []
        this.getAchivements(this.page)
        this.achivmentForm.reset()
        this.createForm()
        this.createAchivments().get('status')?.setValue(true)
        this.isSpinner = false
        this._snackBar.open("Updated/Added successfully", "Ok", {
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

  createAchivments(): FormGroup {
    return this.formBuilder.group({
      achievement_description: '',
      achievement_name: '',
      priority: "",
      status: true,
      id: ""
    });
  }
  deleteAchivment(index: any) {
    console.log(index);
    this.achivmentItems.removeAt(index)
  }
  addAchivments(): void {
    this.achivmentItems = this.achivmentForm.get('items') as FormArray;
    this.achivmentItems.push(this.createAchivments());
    // this.achivmentItems=[]
  }
  @Output() newItemEvent:any = new EventEmitter();
  @Input()  achivemnetSection:any
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes["achivemnetSection"].currentValue);
    console.log(this.achivemnetSection);
  }
  hideUnHide() {
    if(this.achivemnetSection){
      this.achivemnetSection=false
    }else{
      this.achivemnetSection=true
    }
    console.log(this.achivemnetSection);
    
    let data={
      section:"Achievement",
      action:this.achivemnetSection
    }
    this.newItemEvent.emit(data)
  }
}
