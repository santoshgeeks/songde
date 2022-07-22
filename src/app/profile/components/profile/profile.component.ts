import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { CommonService } from 'src/app/common.service';
import { jsPDF } from "jspdf";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileImageUrl: any = "../../../../assets/profileImageAndIcon/profilePic.png"
  coverUrl: any = "../../../../assets/profileImageAndIcon/profileimage.png"
  baseUrl = "https://orbit.songdew.com"
  userBasicDetails: any
  socialMediaLinks: any
  editBaciInfoForm: FormGroup
  overLay = false
  isSpinner = false
  menuBtnClick: boolean = false;
  openDropDownInInstrument = -1
  openDownGener: boolean = false;
  @ViewChild("pdfD", { static: false }) el!: ElementRef
  constructor(
    private comService: CommonService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private renderer: Renderer2,
  ) {
    this.editBaciInfoForm = this.fb.group({
      "edit": ["basic_info"],
      "twitter_url": ["", Validators.required],
      "youtube_url": ["", Validators.required],
      "facebook_url": ["", Validators.required],
      "instagram_url": ["", Validators.required],
      "website_url": ["", Validators.required],
      "spotify_url": ["", Validators.required],
      "country": ["", Validators.required],
      "city": ["", Validators.required],
      "band_name": ["", Validators.required],
      "artist_type": [[]]
    })
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.menuBtnClick) {
        this.openDownGener = false
        this.openDropDownInInstrument = -1
      }
      this.menuBtnClick = false;
    });
  }
  preventCloseOnClick() {
    this.menuBtnClick = true;
  }
  ngOnInit(): void {
    this.getProfileDetails()
    this.getAllsocialMediaLink()
    this.getOpportunity()
    this.getCounty()
    this.getCategory()
  }
  
  savePdf() {
    // let pdf = new jsPDF()
    // pdf.html(this.el.nativeElement, {
    //   width: 190,
    //   callback: (pdf) => {
    //     pdf.save('test11.pdf');
    //   }
    // })
    window.print()

  }
  opportunity: any = []
  getOpportunity() {
    this.isSpinner = true
    this.comService.opportunity().subscribe((res: any) => {
      this.opportunity = res.result
      // console.log(res);
      this.isSpinner = false
    }, error => {
      this.isSpinner = false
      this._snackBar.open("Something went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  countryName = ""
  getProfileDetails() {
    this.isSpinner = true
    this.comService.userPersonalDetails().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.userBasicDetails = res
        this.countryName = this.userBasicDetails.country.name
        console.log(this.userBasicDetails.country.name);
        this.isSpinner = false
      }
    }, error => {
      this.isSpinner = false
      this._snackBar.open("Something went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  bottomOverlayColor = ""
  topOverlayColor = ""
  bottomOverlayColorChange(event: any) {
    console.log(event);
    console.log(this.bottomOverlayColor);
  }
  topOverlayColorChange(event: any) {
    console.log(event);
    console.log(this.topOverlayColor);

  }
  getAllsocialMediaLink() {
    this.isSpinner = true
    this.comService.socialMedia().subscribe((res: any) => {
      console.log(res);
      this.socialMediaLinks = res
      this.isSpinner = false
    }, error => {
      this.isSpinner = false
      this.isSpinner = false
      this._snackBar.open("Something went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  async getBase64ImageFromUrl(imageUrl:any) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();
    return new Promise((resolve, reject) => {
      var reader  = new FileReader();
      reader.addEventListener("load", function () {
          resolve(reader.result);
      }, false);
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';
  seteProfile(data:any) {
    this.getBase64ImageFromUrl(data._profile_pic).then(base64 => {
      this.imageChangedEvent = base64,
     {
      headers: new HttpHeaders({
        "Content-Type": "application/json" ,
        "Access-Control-Allow-Origin": "*"      
      })  
     } 
    })
    console.log(this.imageChangedEvent);
    
    // this.croppedImage = this.profileImageUrl;
    // this.imageChangedEvent = this.profileImageUrl;
    // console.log(this.croppedImage);
    
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  jpegFile: any = ''
  pdfFile: any = ''
  fileChangeEventjpeg(event: any) {
    console.log(event);
    this.jpegFile = event.target.files[0]
  }
  fileChangeEventpdf(event: any) {
    console.log(event.target.files[0]);
    this.pdfFile = event.target.files[0]
  }
  @ViewChild('takeInputLogo', { static: false }) takeInputLogo: any
  resetGpeg() {
    this.takeInputLogo.nativeElement.value = ""
    this.jpegFile = ""
  }
  @ViewChild('takeInputpdf', { static: false }) takeInputpdf: any
  resetPdf() {
    this.takeInputpdf.nativeElement.value = ""
    this.pdfFile = ""
  }
  @ViewChild('takeInput', { static: false }) InputVar: any
  deletPhoto() {
    this.croppedImage = ""
    this.imageChangedEvent = ""
    this.InputVar.nativeElement.value = "";
  }

  fileToUpload: File | null = null;
  base64: any

  @ViewChild('takeInputForCoverPic', { static: false }) InputCoverPicVar: any;
  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;
  reset() {
    this.fileToUpload = null
    this.InputCoverPicVar.nativeElement.value = "";
    this.base64 = ""
    this.croppedImageBanner = ""
  }
  imageChangedEventbanner = ""
  chooseFileForCover(event: any) {
    this.imageChangedEventbanner = event
    this.fileToUpload = event.target.files[0].name
    console.log(event);
  }
  deleteUoloadedBanner() {
    // this.fileToUpload=null
    this.existingBanner=""
    this.reset()
  }
  uploadCoverOrProfile(type: any) {
    let data = {
      edit: "",
      image: ""
    }
    if (type == "profile") {
      data.edit = "profile_pic"
      data.image = this.croppedImage
    }
    if (type == "cover") {
      data.edit = "profile_cover_pic"
      data.image = this.croppedImageBanner
    }
    this.isSpinner = true
    this.comService.editProfile(data).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.getProfileDetails()
        this.isSpinner = false
        this.croppedImageBanner=""
        this._snackBar.open("Added/Updated Successfully", "Ok", {
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

  basicProfileDetails: any
  activeBagageRadio = true
  editBasicProfile(data: any) {
    console.log(data);
    this.editBaciInfoForm.controls["band_name"].setValue(data.user.band_name)
    this.editBaciInfoForm.get("band_name")?.updateValueAndValidity()
    this.editBaciInfoForm.controls["twitter_url"].setValue(data.twitter_id)
    this.editBaciInfoForm.get("twitter_url")?.updateValueAndValidity()
    this.editBaciInfoForm.controls["youtube_url"].setValue(data.youtube_id)
    this.editBaciInfoForm.get("youtube_url")?.updateValueAndValidity()
    this.editBaciInfoForm.controls["facebook_url"].setValue(data.facebook_id)
    this.editBaciInfoForm.get("facebook_url")?.updateValueAndValidity()
    this.editBaciInfoForm.controls["instagram_url"].setValue(data.instagram_id)
    this.editBaciInfoForm.get("instagram_url")?.updateValueAndValidity()
    this.editBaciInfoForm.controls["website_url"].setValue(data.website_url)
    this.editBaciInfoForm.get("website_url")?.updateValueAndValidity()
    this.editBaciInfoForm.controls["spotify_url"].setValue(data.spotify_url)
    this.editBaciInfoForm.get("spotify_url")?.updateValueAndValidity()
    this.editBaciInfoForm.get("country")?.setValue(data.country.name)
    this.editBaciInfoForm.get("country")?.updateValueAndValidity()
    this.editBaciInfoForm.controls["city"].setValue(data.city.name)
    this.editBaciInfoForm.get("city")?.updateValueAndValidity()
    let selectedOption=[]
   for(let i=0; i<data.user.artist_type.length; i++){
    selectedOption.push(data.user.artist_type[i].id)
   }
   this.editBaciInfoForm.get("artist_type")?.setValue(selectedOption)
   this.editBaciInfoForm.get("artist_type")?.updateValueAndValidity()
    this.editBaciInfoForm.updateValueAndValidity()
    this.basicProfileDetails = data
  }
  editbasicInfor(type: any) {
    console.log(this.editBaciInfoForm.value);
    // delete this.editBaciInfoForm.value.artist_type
    this.isSpinner = true
    this.comService.editProfile(this.editBaciInfoForm.value).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.getProfileDetails()
        this.editBaciInfoForm.reset()
        this.editBaciInfoForm.controls["edit"].setValue('basic_info')
        this.isSpinner = false
        this._snackBar.open("Updated/Added successfully", "Ok", {
          duration: 2000,
          panelClass: ['success']
        })
      }
    }, error => {
      this.isSpinner = false
      this._snackBar.open(error.error.error, "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  countryList:any=[]
  categoryList:any=[]
  getCategory(){
    this.comService.getCAtegory().subscribe((res:any)=>{
      // console.log(res);
      this.categoryList=res
    })
  }
  getCounty(){
    this.comService.getCountry().subscribe((res:any)=>{
      // console.log(res);
      this.countryList=res
    })
  }
  coverPicForEdit: any
  existingBanner:any=""
  editCoverPic(data: any) {
    this.existingBanner=this.userBasicDetails._cover_pic
    console.log(this.existingBanner);
    
    console.log(data);
    this.coverPicForEdit = data.cover
    this.reset()
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  croppedImageBanner: any = ''
  imageCroppedBanner(event: ImageCroppedEvent) {
    this.croppedImageBanner = event.base64;
  }
  editProfile() {

  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  saveChanges() {
    this.profileImageUrl = this.croppedImage
  }
  @ViewChild('widgetsContent', { read: ElementRef }) widgetsContent: any
  toTop(e: any) {
    let wrapper = e.srcElement.closest('.msgCardScrollWrapper');
    wrapper.querySelector('.msgCardDeck').scrollLeft -= 500;
    this.widgetsContent.nativeElement.scrollLeft += 150;
    // this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }
  
}
