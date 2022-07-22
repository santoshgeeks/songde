import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.scss']
})
export class ProfilePhotoComponent implements OnInit {
  photo: any = []
  baseUrl = "https://orbit.songdew.com"
  allPhotos: any = [
    // { disc: "", banner: "../../assets/photo/image.png" },
    // { disc: "", banner: "../../assets/photo/image1.png" },
    // { disc: "", banner: "../../assets/photo/image2.png" },
    // { disc: "", banner: "../../assets/photo/image3.png" },
    // { disc: "", banner: "../../assets/photo/image2.png" },
    // { disc: "", banner: "../../assets/photo/image3.png" },
  ]
  isSpinner=false
  constructor(
    private comService: CommonService,
    private _snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {

    this.getPhotos()
  }
  photoMd: any = []
  getPhotos() {
    this.isSpinner=true
    this.comService.photos().subscribe((res: any) => {
      if(res){
        this.allPhotos = res.results
      // console.log(this.allPhotos);
      this.photo = []
      this.photoMd = []
      let mdLength = 0
      let lgLength = 0
      if (this.allPhotos.length < 3) {
        mdLength = this.allPhotos.length
      } else {
        mdLength = 3
      }
      if (this.allPhotos.length < 4) {
        lgLength = this.allPhotos.length
      } else {
        lgLength = 4
      }

      for (let i = 0; i < lgLength; i++) {
        this.photo.push(this.allPhotos[i])
      }
      for (let i = 0; i < mdLength; i++) {
        this.photoMd.push(this.allPhotos[i])
      }
      this.isSpinner=false
      }
    }, error=>{
      this.isSpinner = false
      this._snackBar.open("Something went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  @ViewChild('widgetsContent', { read: ElementRef }) widgetsContent: any
  toTop(e: any) {
    let wrapper = e.srcElement.closest('.msgCardScrollWrapper');
    wrapper.querySelector('.msgCardDeck').scrollLeft -= 500;
    this.widgetsContent.nativeElement.scrollLeft += 150;
    // this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';

  @ViewChild('takeInput', { static: false }) InputVar: any

  // fileChangeEvent(event: any): void {


  // }
  fileToUpload: File | null = null;
  base64: any

  deletePhotoWhileUploadin(){
    this.InputVar.nativeElement.value = "";
    this.fileToUpload = null
  }
  fileChangeEvent(event: any) {
    if(this.allPhotos.length<4){
      this.fileToUpload = event.target.files[0].name
      console.log(event);
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64 = reader.result
      };
    }else{
      alert("You have already uploaded four photos. Delete one,if you wnat to upload new one!")
      this.InputVar.nativeElement.value = "";
      this.deletePhotoWhileUploadin()
    }
   

  }

  deletePhoto(data: any) {
    console.log(data);
    data.status = false
    let temp = {
      "img_id": data.id,
    }
    this.isSpinner=true
    this.comService.deletePhoto(temp).subscribe((res: any) => {
      if (res) {
        this.getPhotos()
        this.isSpinner = false
        this._snackBar.open("Deleted successfully", "Ok", {
          duration: 2000,
          panelClass: ['success']
        })
      }
    }, error=>{
      this.isSpinner = false
      this._snackBar.open("Something went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })

  }

  f() {
    let file: any = document.getElementById("BtnBrowseHidden")
    console.log(file);

  }

  saveChanges() {
    console.log(this.base64);
    let data = {
      "priority": 4,
      "status": true,
      "description": "",
      "image": this.base64

    }
    this.isSpinner=true
    this.comService.addPhotos(data).subscribe((res: any) => {
      console.log(res);
      this.getPhotos()
      if(res){
        this.isSpinner = false
        this._snackBar.open("Updated/Added successfully", "Ok", {
          duration: 2000,
          panelClass: ['success']
        })
      }
    },error=>{
      this.isSpinner = false
      this._snackBar.open("something went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  
  @Output() newItemEvent:any = new EventEmitter();
  @Input()  photosSection:any
  hideUnHide() {
    if(this.photosSection){
      this.photosSection=false
    }else{
      this.photosSection=true
    }
    console.log(this.photosSection);
    
    let data={
      section:"Photos",
      action:this.photosSection
    }
    this.newItemEvent.emit(data)
  }
}
