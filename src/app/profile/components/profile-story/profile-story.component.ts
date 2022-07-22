import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-profile-story',
  templateUrl: './profile-story.component.html',
  styleUrls: ['./profile-story.component.scss']
})
export class ProfileStoryComponent implements OnInit {
  openDownLanguage: boolean = false;
  openDownGener: boolean = false;
  menuBtnClick: boolean = false;
  menbers = [
    { name: "Raj Kumar", experties: "Vocals" },
    { name: "Mike Seter", experties: "Lead Guitar" },
    { name: "Jatin Jain ", experties: "Drums" },
    { name: "Rose Lewis", experties: "Key Boards" },
  ]
  bandMembersForm: FormGroup | any;
  bandMembersitems: FormArray | any;
  baseUrl = "https://orbit.songdew.com"
  userDetails: any
  userBasicDetails: any
  openDropDownInInstrument = -1
  isSpinner = false
  constructor(
    private formBuilder: FormBuilder,
    private comService: CommonService,
    private renderer: Renderer2,
    private _snackBar: MatSnackBar,
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.menuBtnClick) {
        this.openDownLanguage = false;
        this.openDownGener = false
        this.openDropDownInInstrument = -1
      }
      this.menuBtnClick = false;
    });
  }
  toggleMenu() {
    this.openDownLanguage = !this.openDownLanguage;
    this.openDownGener = false
    this.openDropDownInInstrument = -1
  }
  preventCloseOnClick() {
    this.menuBtnClick = true;
  }
  createBandMemberForm() {
    this.bandMembersForm = new FormGroup({
      items: new FormArray([])
    });
  }
  ngOnInit(): void {
    this.createBandMemberForm()
    this.userDetails = JSON.parse(sessionStorage.getItem("user") || '{}')
    this.getUserDetails()
    this.getBandMembers()
    this.getLanguage()
    this.getGenrs()
    this.getBandRoles()
  }

  getUserDetails() {
    this.isSpinner = true
    this.comService.userPersonalDetails().subscribe((res: any) => {
      if (res) {
        this.userBasicDetails = res
        this.isSpinner = false
      }
    }, error => {
      this.isSpinner = false
      this._snackBar.open("Somthing went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  bandMembersList: any
  getBandMembers() {
    this.isSpinner = false
    this.comService.bandMembers().subscribe((res: any) => {
      if (res) {
        this.isSpinner = false
        this.bandMembersList = res.data
        console.log(this.bandMembersList)
      }
    }, error => {
      this.isSpinner = false
      this._snackBar.open("Somthing went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    }

    )
  }

  jsonAbout: any = {
    edit: "about",
    story: "",
    language: [],
    genre: [],
    featured_image: null,
    featured_yt_link: null
  }
  // isFeatureImage=null
  // isyoutubeLink=null
  edit() {
    this.countBandMembers = 0
    // console.log(this.userBasicDetails);
    this.selectedLanguage = []
    this.selectedGeners = []
    this.jsonAbout.story = this.userBasicDetails._biography
    this.jsonAbout.language = this.userBasicDetails.user.language
    this.jsonAbout.genre = this.userBasicDetails.user.genre
    this.jsonAbout.featured_image = this.userBasicDetails.featured_image
    this.jsonAbout.featured_yt_link = this.userBasicDetails.featured_yt_link
    // this.isFeatureImage=this.userBasicDetails.featured_image
    // this.isyoutubeLink=this.userBasicDetails.featured_yt_link
    this.base64 = this.userBasicDetails.featured_image
    this.generList = this.userBasicDetails.user.genre
    console.log(this.userBasicDetails);
    let a = []
    for (let i = 0; i < this.generList.length; i++) {
      a.push(
        {
          count: 0,
          image: "",
          isSelected: true,
          is_onboard: true,
          name: this.generList[i],
        }
      )

    }
    for (let i = 0; i < a.length; i++) {
      this.selectedGeners.push(a[i])
      // this.choosenGener(true, a[i], i)
      for (let j = 0; j < this.listOfgeners.length; j++) {
        // console.log(this.listOfgeners[i]);
        if (a[i].name == this.listOfgeners[j].name) {
          this.listOfgeners[j].isSelected = true
        }
      }
    }
    // console.log(this.listOfgeners);

    if (this.userBasicDetails.user.language.length > 0) {
      for (let j = 0; j < this.listofLanguage.length; j++) {
        for (let i = 0; i < this.userBasicDetails.user.language.length; i++) {
          if (this.userBasicDetails.user.language[i] == this.listofLanguage[j].name)
            this.listofLanguage[i].isSelected = true
        }
      }
      for (let j = 0; j < this.listofLanguage.length; j++) {
        if (this.listofLanguage[j].isSelected) {
          this.selectedLanguage.push(this.listofLanguage[j])
        }
      }

    } else {
      this.selectedLanguage = []
    }
    if (this.bandMembersList.length > 0) {
      this.addExisting()
    }
    console.log(this.bandMembersList);
  }
  @ViewChild('videoPlayer', { static: false }) videoplayer: any;
  toggleVideo(event: any) {
    var vid: any = document.getElementById("myVideo");
    vid.play();
  }
  resetBandMembers() {
    // this.bandMembersForm.reset()

  }
  instrumentToSet = ""
  intrumentsList: any = []
  // axistingBands=true
  count = 0
  addExisting() {
    this.createBandMemberForm()
    this.count += 1
    // console.log(this.bandMembersList);
    // for(let i=0; this.bandMembersList.length; i++){
    //   this.deleteBrandMember(i)
    // }
    let formArray: any = this.bandMembersForm.get("items") as FormArray;
    for (let i = 0; i < this.bandMembersList.length; i++) {
      this.addBandMembers()
      formArray.at(i).get('name').setValue(this.bandMembersList[i].name)
      formArray.at(i).get('name').updateValueAndValidity()
      for (let j = 0; j < this.bandMembersList[i].roles.length; j++) {
        formArray.at(i).get('Instrument').value.push(this.bandMembersList[i].roles[j])
        formArray.at(i).get('Instrument').updateValueAndValidity()
        formArray.at(i).get('listOfIntrument').value.push(this.bandMembersList[i].roles[j].rolid)
        formArray.at(i).get('listOfIntrument').updateValueAndValidity()
      }
    }

  }
  returnArray(index: any) {
    return this.bandMembersitems.at(index).get('Instrument').value
  }

  deletInstrument(indexJ: any, indexI: any, item: any) {
    // console.log(item);
    let formArray: any = this.bandMembersForm.get("items") as FormArray;
    let data = formArray.at(indexI).get('listOfIntrument').value
    for (let i = 0; i < data.length; i++) {
      if (item == data[i]) {
        data.splice(i, 1)
      }
    }
    formArray.at(indexI).get('listOfIntrument').setValue(data)
    if (formArray.at(indexI).get('listOfIntrument').value.length == 0) {
      this.deleteBrandMember(indexI)
    }

  }

  selectedInstruments: any = []
  choosenInstruments(event: any, data: any, index: number, formIndex: number) {
    let formArray: any = this.bandMembersForm.get("items") as FormArray;
    if (event.target.checked) {
      formArray.at(formIndex).get('Instrument').value.push(data)
      formArray.at(formIndex).get('Instrument').updateValueAndValidity()
      // formArray.at(formIndex).controls['Instrument'].up;
      formArray.at(formIndex).get('listOfIntrument').value.push(data.rolid)
      formArray.at(formIndex).get('listOfIntrument').updateValueAndValidity()
    } else {
      formArray.at(formIndex).get('Instrument').value.splice(index, 1)
      formArray.at(formIndex).get('listOfIntrument').value.push(data.rolid)
      formArray.at(formIndex).get('listOfIntrument').updateValueAndValidity()
      formArray.at(formIndex).get('Instrument').updateValueAndValidity()
      //   formArray.at(formIndex).get('Instrument').value.forEach((element:any,index:number)=>{
      //     if(element.name==data.name) {
      //       formArray.at(formIndex).get('Instrument').value.splice(index,1)
      //       formArray.at(formIndex).get('listOfIntrument').value.push(data.rolid)
      //     }
      //  });
    }
    // let roleId=[]
    // for(let i=0; i<this.selectedInstruments.length; i++){
    //   roleId.push(this.selectedInstruments[i].rolid)
    // }


    // console.log(this.bandMembersForm.value);

  }
  instrumentSlected(data: any) {
    if (data.value.Instrument.length == 0) {
      for (let i = 0; i < this.instrumentsList.length; i++) {
        this.instrumentsList[i].isSelected = false
      }
    } else {
      for (let i = 0; i < this.instrumentsList.length; i++) {
        this.instrumentsList[i].isSelected = false
        for (let j = 0; j < data.value.Instrument.length; j++) {
          if (this.instrumentsList[i].role == data.value.Instrument[j].role) {
            this.instrumentsList[i].isSelected = true
          }
        }
      }
    }
  }
  deletInstruments(index: number, data: any, formIndex: number) {
    let formArray: any = this.bandMembersForm.get("items") as FormArray;
    formArray.at(formIndex).get('Instrument').value.splice(index, 1)
    formArray.at(formIndex).get('listOfIntrument').value.splice(index, 1)
  }
  listOfgeners: any = []
  getGenrs() {
    this.isSpinner = true
    this.comService.getGener().subscribe((res: any) => {
      if (res) {
        this.listOfgeners = res
        for (let i = 0; i < this.listOfgeners.length; i++) {
          this.listOfgeners[i]["isSelected"] = false
        }
        this.isSpinner = false
      }
    }, error => {
      this.isSpinner = false
      this._snackBar.open("Somthing went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  listofLanguage: any = []
  getLanguage() {
    this.isSpinner = true
    this.comService.getLanguages().subscribe((res: any) => {
      if (res) {
        let temp = res
        for (let i = 0; i < temp.length; i++) {
          temp[i]["isSelected"] = false
        }
        this.listofLanguage = temp
        this.isSpinner = false
      }
    }, error => {
      this.isSpinner = false
      this._snackBar.open("Somthing went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  instrumentsList: any = []
  getBandRoles() {
    this.isSpinner = false
    this.comService.getInstuments().subscribe((res: any) => {
      if (res) {
        this.instrumentsList = res.data
        this.isSpinner = false
        for (let i = 0; i < this.instrumentsList.length; i++) {
          this.instrumentsList[i]["isSelected"] = false
        }
      }
    }, error => {
      this.isSpinner = false
      this._snackBar.open("Somthing went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  languageToSet = ""
  selectedLanguage: any = []
  selecteLanguage(event: any, data: any, index: any) {
    // console.log(event, data, index);
    if (event.target.checked) {
      this.selectedLanguage.push(data)
    } else {
      this.selectedLanguage.forEach((element: any, index: number) => {
        if (element.name == data.name) {
          this.selectedLanguage.splice(index, 1)
        }
      });

    }
  }
  deleteLanguage(index: any, data: any) {
    // console.log(index);
    this.selectedLanguage.splice(index, 1)
    for (let i = 0; i < this.listofLanguage.length; i++) {
      if (data.name == this.listofLanguage[i].name) {
        this.listofLanguage[i].isSelected = false
      }
    }
    if (this.selectedLanguage.length > 0) {
      this.openDownLanguage = true;
    } else {
      this.openDownLanguage = false;
      for (let i = 0; i < this.listofLanguage.length; i++) {
        if (data.name == this.listofLanguage[i].name) {
          this.listofLanguage[i]['isSelected'] = false
        }
      }
    }
  }

  generList: any = []
  generToSet = ""
  selectedGeners: any = []
  choosenGener(event: any, data: any, index: number) {
    // console.log(event, data, index);
    if (event.target.checked) {
      this.selectedGeners.push(data)
    } else {
      this.selectedGeners.forEach((element: any, index: number) => {
        if (element.name == data.name) {
          this.selectedGeners.splice(index, 1)
        }
      });
    }

  }
  deletGener(index: number, data: any) {
    this.selectedGeners.splice(index, 1)
    for (let i = 0; i < this.listOfgeners.length; i++) {
      if (data.name == this.listOfgeners[i].name) {
        this.listOfgeners[i].isSelected = false
      }
    }
    if (this.selectedGeners.length > 0) {
      this.openDownGener = true;
    } else {
      this.openDownGener = false;
      for (let i = 0; i < this.listOfgeners.length; i++) {
        if (data.name == this.listOfgeners[i].name) {
          this.listOfgeners[i]['isSelected'] = false
        }
      }
    }
  }
  selectedInstrumentsList: any = []
  chooseInstrument(value: any) {
    this.selectedInstrumentsList.push(value.target.value)
  }
  deleteBrandMember(index: any) {
    this.countBandMembers -= 1
    this.bandMembersitems.removeAt(index)
  }
  createBrandMembers(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      Instrument: [[]],
      listOfIntrument: [[], Validators.required],
    });
  }
  countBandMembers = 0
  addBandMembers(): void {
    this.countBandMembers += 1
    this.selectedInstruments = []
    if (this.countBandMembers < 16) {
      this.bandMembersitems = this.bandMembersForm.get('items') as FormArray;
      if (this.bandMembersForm.valid) {
        this.bandMembersitems.push(this.createBrandMembers());
        this.intrumentsList = []
      }
    } else {
      alert("You can not add more than 15 members.")
    }


  }
  croppedImage: any = '';
  profileImageUrl: any = "../../assets/profileImageAndIcon/profilePic.png"

  coverChoosen = false
  // coverCoose(coverChoosenType:any){
  //   this.coverChoosen=coverChoosenType

  // }
  fileToUpload: any = ""
  base64: any = ""
  featured_imageUrl = ""
  featured_yt_link = ""
  featureImageChoogen(event: any) {
    // console.log("this is me");

    this.fileToUpload = event.target.files[0].name
    // console.log(event);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result
      this.jsonAbout.featured_image = this.base64
    };
    // console.log(this.jsonAbout.featured_image);



  }
  @ViewChild('imageInput', { static: false }) myInputVariable: ElementRef | any;
  restTHeImage() {
    console.log("this is me");
    this.myInputVariable.nativeElement.value = "";
    this.base64 = ""
    this.fileToUpload = ""
    this.jsonAbout.featured_yt_link = null
    this.jsonAbout.featured_image = null
  }
  player: any
  savePlayer(player: any) {
    this.player = player;
    console.log('player instance', player);
  }
  onStateChange(event: any) {
    console.log('player state', event.data);
  }
  isFinished = false
  saveChanges() {
    this.isSpinner = true
    this.count = 0
    this.jsonAbout.language = []
    if (this.featured_imageUrl != '') {
      this.jsonAbout.featured_image = this.featured_imageUrl
      this.jsonAbout.featured_yt_link = null
    }
    if (this.featured_yt_link != '') {
      this.jsonAbout.featured_yt_link = this.featured_yt_link
      this.jsonAbout.featured_image = ""
    }
    this.jsonAbout.genre = this.selectedGeners
    // console.log(this.listofLanguage);
    let langtemp = []
    for (let i = 0; i < this.listofLanguage.length; i++) {
      if (this.listofLanguage[i].isSelected == true) {
        langtemp.push(this.listofLanguage[i].name)
      }
    }
    let generstemp = []
    for (let i = 0; i < this.selectedGeners.length; i++) {
      if (this.selectedGeners[i].isSelected == true) {
        generstemp.push(this.selectedGeners[i].name)
      }
    }
    this.profileImageUrl = this.croppedImage
    this.jsonAbout.language = langtemp
    this.jsonAbout.genre = generstemp
    this.isFinished = true
    this.comService.editAbout(this.jsonAbout).subscribe((res: any) => {
      if (res) {
        this.createBandMemberForm()
        this.getUserDetails()
        this.isSpinner = false
        this.isFinished = false
        this._snackBar.open("About Updated/Added About Successfully", "Ok", {
          duration: 2000,
          panelClass: ['success']
        })
      }
    }, error => {
      this.isSpinner = false
      this._snackBar.open(error.error, "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
    let currentUser = JSON.parse(sessionStorage.getItem("user") || '{}')
    let roleList = []
    for (let i = 0; i < this.bandMembersForm.value.items.length; i++) {
      roleList.push(
        {
          name: this.bandMembersForm.value.items[i].name,
          role: this.bandMembersForm.value.items[i].listOfIntrument
        }
      )
    }
    let data = {
      "user_id": this.userBasicDetails.user.id,
      "members": roleList
    }

    this.comService.addBandMember(data).subscribe((res: any) => {
      if (res) {
        this.getUserDetails()
        this.getBandMembers()
        this.bandMembersForm.reset()
        this.selectedInstruments = []
        this.isSpinner = false
        this._snackBar.open("Band Members Updated/Added Successfully", "Ok", {
          duration: 2000,
          panelClass: ['success']
        })
      }
    }, error => {
      this.isSpinner = false
      this._snackBar.open(error.error, "Ok", {
        duration: 20000,
        panelClass: ['error']
      })
    })

  }
  @Output() newItemEvent:any = new EventEmitter();
  @Input()  aboutSection:any
  hideUnHide() {
    if(this.aboutSection){
      this.aboutSection=false
    }else{
      this.aboutSection=true
    }
    console.log(this.aboutSection);
    
    let data={
      section:"About",
      action:this.aboutSection
    }
    this.newItemEvent.emit(data)
  }
}
