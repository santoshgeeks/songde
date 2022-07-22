import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-profile-d',
  templateUrl: './profile-d.component.html',
  styleUrls: ['./profile-d.component.scss']
})
export class ProfileDComponent implements OnInit {

  menbers = [
    { name: "Raj Kumar", experties: "Vocals" },
    { name: "Mike Seter", experties: "Lead Guitar" },
    { name: "Jatin Jain ", experties: "Drums" },
    { name: "Rose Lewis", experties: "Key Boards" },
  ]
  achievements = [
    { winnerPosition: "Winner", disc: "Won Best Rock Band of the year waward in 2021" },
    { winnerPosition: "Nominated", disc: "Nominated for most promising emerging talent is Asia" },
    { winnerPosition: "Winner", disc: "Won Best  Music video for BLACK NIGHTS MTV in 2022" },
    { winnerPosition: "Winner", disc: "Winner of an international talent contest" }
  ]
  musicTracks = [
    {
      songName: "Just the Way",
      time: "3:52",
      audioFile: "../../assets/musicImages/audio/file_example_MP3_1MG.mp3",
      disc: "Blanco Brown, Parmalee, Bryce Vine",
      banner: "../../assets/musicImages/song1.png",
      isPlaying: false,
      duration: "3:53",
      albumType: "Album",
      highlighted: true,
      activeView: false,
      view: false
    },
    {
      songName: "Met Him Last Night",
      time: "3:52",
      audioFile: "../../assets/musicImages/audio/file_example_MP3_2MG.mp3",
      disc: "Demi Lovato, Ariana Grande",
      banner: "../../assets/musicImages/song2.png",
      isPlaying: true,
      duration: "3:53",
      albumType: "single",
      highlighted: true,
      activeView: false,
      view: false
    },
    {
      songName: "Wonderful Life",
      time: "3:52",
      audioFile: "../../assets/musicImages/audio/file_example_MP3_700KB (1).mp3",
      disc: "Imany, Stream Jockey",
      banner: "../../assets/musicImages/song3.png",
      isPlaying: false,
      duration: "3:53",
      albumType: "Album",
      highlighted: false,
      activeView: false,
      view: true
    },
    {
      songName: "A Song",
      time: "3:52",
      audioFile: "../../assets/musicImages/audio/file_example_MP3_1MG.mp3",
      disc: "Lilly Wood & The Prick",
      banner: "../../assets/musicImages/song4.png",
      isPlaying: false,
      duration: "3:53",
      albumType: "single",
      highlighted: false,
      activeView: true,
      view: false
    },
    {
      songName: "Me, Myself and I",
      time: "3:52",
      audioFile: "../../assets/musicImages/audio/file_example_MP3_2MG.mp3",
      disc: "The Suncatchers, Michel Fannoun",
      banner: "../../assets/musicImages/song5.png",
      isPlaying: false,
      duration: "3:53",
      albumType: "single",
      highlighted: false,
      activeView: false,
      view: true
    },

  ]
  playingTrack = {
    songName: "Just the Way",
    time: "3:52",
    audioFile: "../../assets/musicImages/audio/file_example_MP3_1MG.mp3",
    disc: "Blanco Brown, Parmalee, Bryce Vine",
    banner: "../../assets/musicImages/song1.png",
    isPlaying: false,
    duration: "3:53"
  }
  popularTracs = [
    {
      songName: "Just the Way",
      time: "3:52",
      audioFile: "../../assets/musicImages/audio/file_example_MP3_1MG.mp3",
      disc: "Blanco Brown, Parmalee, Bryce Vine",
      banner: "../../assets/musicImages/song1.png",
      isPlaying: false,
      duration: "3:53"
    },
    {
      songName: "Met Him Last Night",
      time: "3:52",
      audioFile: "../../assets/musicImages/audio/file_example_MP3_2MG.mp3",
      disc: "Demi Lovato, Ariana Grande",
      banner: "../../assets/musicImages/song2.png",
      isPlaying: true,
      duration: "3:53"
    },
    {
      songName: "Wonderful Life",
      time: "3:52",
      audioFile: "../../assets/musicImages/audio/file_example_MP3_700KB (1).mp3",
      disc: "Imany, Stream Jockey",
      banner: "../../assets/musicImages/song3.png",
      isPlaying: false,
      duration: "3:53"
    },
    {
      songName: "A Song",
      time: "3:52",
      audioFile: "../../assets/musicImages/audio/file_example_MP3_1MG.mp3",
      disc: "Lilly Wood & The Prick",
      banner: "../../assets/musicImages/song4.png",
      isPlaying: false,
      duration: "3:53"
    },
    {
      songName: "Me, Myself and I",
      time: "3:52",
      audioFile: "../../assets/musicImages/audio/file_example_MP3_2MG.mp3",
      disc: "The Suncatchers, Michel Fannoun",
      banner: "../../assets/musicImages/song5.png",
      isPlaying: false,
      duration: "3:53"
    },
  ]
  listOfVideos = [
    {
      videoName: "Rock Me Amadeus",
      videoLink: "../../assets/profileImageAndIcon/video.mp4",
      artistName: "Jeams Kumar",
      videoBanner: "../../assets/profileImageAndIcon/video/imagevideo.png",
      highlighted: true,
      activeView: false,
      view: false

    },
    {
      videoName: "My song of happiness",
      videoLink: "../../assets/profileImageAndIcon/video.mp4",
      artistName: "Jeams Kumar",
      videoBanner: "../../assets/profileImageAndIcon/video/imagevideo1.png",
      highlighted: false,
      activeView: true,
      view: false

    },
    {
      videoName: "Met Him Last Night",
      videoLink: "../../assets/profileImageAndIcon/video.mp4",
      artistName: "Jeams Kumar",
      videoBanner: "../../assets/profileImageAndIcon/video/imagevideo.png",
      highlighted: false,
      activeView: false,
      view: true

    },
  ]
  photo: any = []
  allPhotos = [
    { disc: "", banner: "../../assets/photo/image.png" },
    { disc: "", banner: "../../assets/photo/image1.png" },
    { disc: "", banner: "../../assets/photo/image2.png" },
    { disc: "", banner: "../../assets/photo/image3.png" },
    { disc: "", banner: "../../assets/photo/image2.png" },
    { disc: "", banner: "../../assets/photo/image3.png" },
  ]
  livePerformance = [
    { day: 30, month: "Apr", eventName: "Springfest  LLT Kharagput", place: "Kharagput, India", year: "2021" },
    { day: 21, month: "Apr", eventName: "NH7 Weekender fest", place: "Bangalore, India", year: "2021" },
    { day: 16, month: "Mar", eventName: "Automation India Expo 2021", place: "Mumbai, India", year: "2021" },
    { day: 20, month: "Jan", eventName: "India Internet Day", place: "Gurgaon, India", year: "2021" },
    { day: 24, month: "Nov", eventName: "India Manufacturing Show", place: "Bangalore, India", year: "2020" }
  ]

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
  assetsForDownload = [
    { id: 1, icon: "../../assets/icons/box.png", assetName: "Logotipe" },
    { id: 2, icon: "../../assets/icons/Image.png", assetName: "Images" },
    { id: 3, icon: "../../assets/icons/file-text.png", assetName: "Tech Rider" },
    { id: 4, icon: "../../assets/icons/folder-plus.png", assetName: "electronic press kit" },
  ]
  businesEnquiries = [
    { businessName: "Live Gigs/Events", isSelected: true },
    { businessName: "Session Player", isSelected: true },
    { businessName: "Music licensing", isSelected: true },
    { businessName: "Collaboration", isSelected: true },
    { businessName: "Music production", isSelected: false },
    { businessName: "Tution", isSelected: false },
  ]
  profileImageUrl: any = "../../assets/profileImageAndIcon/profilePic.png"

  language: any = []
  bandMembersForm: FormGroup | any;
  bandMembersitems: FormArray | any;

  achivmentForm: FormGroup | any;
  achivmentItems: FormArray | any;

  liveperformancetForm: FormGroup | any;
  liveperformanceItems: FormArray | any;

  inPressForm: FormGroup | any;
  inPressItems: FormArray | any;
  constructor(private formBuilder: FormBuilder, private comService:CommonService) { }

  ngOnInit(): void {
    this.bandMembersForm = new FormGroup({
      items: new FormArray([])
    });
    this.achivmentForm = new FormGroup({
      items: new FormArray([])
    });
    this.liveperformancetForm = new FormGroup({
      items: new FormArray([])
    });
    this.inPressForm = new FormGroup({
      items: new FormArray([])
    });
    this.photo = []
    for (let i = 0; i < 4; i++) {
      this.photo.push(this.allPhotos[i])
    }
    this.getPersonalDetails()
  }
  getPersonalDetails(){
    this.comService.userPersonalDetails().subscribe((res:any)=>{
      console.log(res);
      
    })
  }
  instrumentsList = ["Lead Guitarist", "Vocals", "Drums"]
  selectedInstrumentsList: any = []
  createBrandMembers(): FormGroup {
    return this.formBuilder.group({
      name: '',
      Instrument: [],
      listOfIntrument: []
    });
  }
  addBandMembers(): void {
    this.bandMembersitems = this.bandMembersForm.get('items') as FormArray;
    this.bandMembersitems.push(this.createBrandMembers());
  }
  addLivePerformance(): void {
    this.liveperformanceItems = this.liveperformancetForm.get('items') as FormArray;
    this.liveperformanceItems.push(this.createLivePerformance());
  }
  addInPressArtical(): void {
    this.inPressItems = this.inPressForm.get('items') as FormArray;
    this.inPressItems.push(this.createInPressArtical());
  }

  createInPressArtical(): FormGroup {
    return this.formBuilder.group({
      date: '',
      source: '',
      title:'',
      link:'',
      quote:'',
    });
  }
  createLivePerformance(): FormGroup {
    return this.formBuilder.group({
      date: '',
      year: '',
      country:'',
      city:'',
      event:'',
    });
  }
  createAchivments(): FormGroup {
    return this.formBuilder.group({
      title: '',
      event: '',
    });
  }
  addAchivments(): void {
    this.achivmentItems = this.achivmentForm.get('items') as FormArray;
    this.achivmentItems.push(this.createAchivments());
  }
  choosenLanguage(value: any) {
    this.language.push(value.target.value)
  }
  deletLanguage(index: any) {
    this.language.splice(index, 1)
  }
  chooseInstrument(value: any) {
    // this.bandMembersForm.at(index).get('item') as FormArray
    this.selectedInstrumentsList.push(value.target.value)
  }
  deleteAchivment(index: any) {
    this.achivmentItems.removeAt(index)
  }
  deleteLivePEvent(index: any) {
    this.liveperformanceItems.removeAt(index)
  }
  deleteBrandMember(index: any) {
    this.bandMembersitems.removeAt(index)
  }
  deleteArticale(index: any) {
    this.inPressItems.removeAt(index)
  }
  checkedEnquiries(event: any, index: any) {
    this.businesEnquiries[index].isSelected = event.target.checked
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';
  seteProfile() {
    this.croppedImage = this.profileImageUrl;
    this.imageChangedEvent = this.profileImageUrl;
  }
  
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  
  
  jpegFile:any=''
  pdfFile:any=''
  fileChangeEventjpeg(event:any){
    console.log(event);
    this.jpegFile=event.target.files[0]
  }
  fileChangeEventpdf(event:any){
    console.log(event.target.files[0]);
    this.pdfFile=event.target.files[0]
  }
  @ViewChild('takeInputLogo', { static: false }) takeInputLogo: any
  resetGpeg(){
    this.takeInputLogo.nativeElement.value=""
    this.jpegFile=""
  }
  @ViewChild('takeInputpdf', { static: false }) takeInputpdf: any
  resetPdf(){
    this.takeInputpdf.nativeElement.value=""
    this.pdfFile=""
  }
  @ViewChild('takeInput', { static: false }) InputVar: any
  deletPhoto() {
    this.croppedImage = ""
    this.imageChangedEvent = ""
    this.InputVar.nativeElement.value = "";
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
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
