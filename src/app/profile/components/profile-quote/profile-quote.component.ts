import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-profile-quote',
  templateUrl: './profile-quote.component.html',
  styleUrls: ['./profile-quote.component.scss']
})
export class ProfileQuoteComponent implements OnInit {
  isSpinner=false
  quoteList: any = []
  quoteJson = {
    author: "",
    quote: "",
    id: "",
    priority: 1,
    status: true,
  }
  quoteForm: FormGroup
  constructor(
    private comService: CommonService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
  ) {
    this.quoteForm = this.fb.group({
      author: ['', Validators.required],
      quote: ['', Validators.required],
      link: [''],
      priority: [1],
      id: [''],
      status: [true]
    })

  }

  ngOnInit(): void {
    this.getQuote()
  }
  reset() {
    this.quoteForm.reset()
    this.quoteForm.get('status')?.setValue(true)
    this.quoteForm.get('status')?.updateValueAndValidity()
    this.quoteForm.get('priority')?.setValue(1)
    this.quoteForm.get('priority')?.updateValueAndValidity()
    this.quoteForm.get('link')?.setValue("")
    this.quoteForm.get('link')?.updateValueAndValidity()

  }
  editQuote() {
    console.log(this.quoteList);
    if (Object.keys(this.quoteList).length > 0) {
      this.quoteForm.get('quote')?.setValue(this.quoteList.quote)
      this.quoteForm.get('quote')?.updateValueAndValidity()
      this.quoteForm.get('author')?.setValue(this.quoteList.author)
      this.quoteForm.get('author')?.updateValueAndValidity()
      this.quoteForm.get('id')?.setValue(this.quoteList.id)
      this.quoteForm.get('id')?.updateValueAndValidity()
      this.quoteForm.get('status')?.setValue(this.quoteList.status)
      this.quoteForm.get('status')?.updateValueAndValidity()
    } else {
      this.quoteForm.get('id')?.setValue("")
      this.quoteForm.get('id')?.updateValueAndValidity()
      this.quoteForm.get('status')?.setValue(true)
      this.quoteForm.get('status')?.updateValueAndValidity()
    }
    console.log(this.quoteForm.value);

  }
  deleteQuote() {
    console.log(this.quoteForm.value);
    this.isSpinner = true
    let data = {
      id: this.quoteForm.value.id,
      status: false
    }
    this.comService.addQuotes(data).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.reset()
        this.getQuote()
        this.isSpinner = false
        this._snackBar.open("Deleted successfully", "Ok", {
          duration: 2000,
          panelClass: ['success']
        })
      }
    }, error => {
      this.isSpinner = false
      this._snackBar.open("Something else wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  getQuote() {
    this.isSpinner = true
    this.comService.quote().subscribe((res: any) => {
      if (res) {
        this.quoteList = res.data
        // console.log(this.quoteList);
        this.isSpinner = false
      }
    },error=>{
      this._snackBar.open("Something else wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }

  saveChanges() {
    this.isSpinner = true
    console.log(this.quoteForm.value);
    this.comService.addQuotes(this.quoteForm.value).subscribe((res: any) => {
      if (res) {
        this.getQuote()
        this.reset()
        this.isSpinner = false
        this._snackBar.open("Updated/Added successfully", "Ok", {
          duration: 2000,
          panelClass: ['success']
        })
      }
    },error=>{
      this.isSpinner = false
      this._snackBar.open("Something else wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  @Output() newItemEvent:any = new EventEmitter();
  @Input()  quoteSection:any
  hideUnHide() {
    if(this.quoteSection){
      this.quoteSection=false
    }else{
      this.quoteSection=true
    }
    console.log(this.quoteSection);
    
    let data={
      section:"Quote",
      action:this.quoteSection
    }
    this.newItemEvent.emit(data)
  }
}
