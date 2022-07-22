import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertPopupComponent } from 'src/app/alert-popup/alert-popup.component';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-profile-music',
  templateUrl: './profile-music.component.html',
  styleUrls: ['./profile-music.component.scss']
})
export class ProfileMusicComponent implements OnInit {
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
  isSpinner=false
  tabName = ""
  tabNameSong="Songs"
  tabs = [
    { name: "Album", isSelected: true },
    { name: "Playlist", isSelected: false },
    // { name: "Songs", isSelected: false }
  ]
  ishilightedAlbum = false
  ishilightedPlaylist = false
  baseUrl = "https://orbit.songdew.com"
  constructor(private comService: CommonService,
     public dialog: MatDialog,
     private _snackBar: MatSnackBar,
     ) { }

  ngOnInit(): void {
    // this.getMusics()
    this.getAlbum()
    this.getSongs()
    this.getPlayList()
    this.tabChange(0)
    this.getSection()
  }
  openAlertBox(text: any) {
    this.dialog.open(AlertPopupComponent, {
      width: "300px",
      data: text
    })
  }
  drop(event: CdkDragDrop<any[]>) {
    console.log(event.container);
    console.log(event.previousContainer);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    // for (var i = 0; i < this.header.length; i++) {
    //   this.header[i].seqNo = i
    // }

    // this.header.sort(function (a, b) { return a.seqNo - b.seqNo; });
    // console.log(this.header);
  }

  hilightedAlbum: any
  setHilightedAlbum(data: any, index: any) {
    this.hilightedAlbum = []
    console.log(data);
    for (let i = 0; i < this.listOfAlbum.length; i++) {
      this.listOfAlbum[i].is_highlighted = false
    }
    this.listOfAlbum[index].is_highlighted = true
    this.ishilightedAlbum = true
    this.hilightedAlbum = data
    if (this.ishilightedPlaylist) {
      if (confirm("Playlist is hilighted already, do you want to unhilight and proceed?")) {
        this.ishilightedPlaylist = false
        for (let i = 0; i < this.playLists.length; i++) {
          this.playLists[i].is_highlighted = false
        }
        this.listOfAlbum[index].is_highlighted = true
      } else {
        for (let i = 0; i < this.playLists.length; i++) {
          this.playLists[i].is_highlighted = false
        }
        this.listOfAlbum[index].is_highlighted = false
        this.ishilightedPlaylist = true
      }
    }
    // if(this.ishilightedPlaylist){
    //   this.openAlertBox("Playlist is hilighted already. Do you want to remove that ?")
    // }
  }
  setHilightedPalylist(data: any, index: any) {
    this.hilightedAlbum = []
    console.log(data);
    for (let i = 0; i < this.playLists.length; i++) {
      this.playLists[i].is_highlighted = false
    }
    // this.hilightedAlbum=data
    this.playLists[index].is_highlighted = true
    this.ishilightedPlaylist = true
    if (this.ishilightedAlbum) {
      if (confirm("Album is hilighted already, do you want to unhilight and proceed?")) {
        this.ishilightedAlbum = false
        for (let i = 0; i < this.listOfAlbum.length; i++) {
          this.listOfAlbum[i].is_highlighted = false
        }
        this.playLists[index].is_highlighted = true
        this.ishilightedPlaylist = true
      } else {
        for (let i = 0; i < this.playLists.length; i++) {
          this.playLists[i].is_highlighted = false
        }
        this.playLists[index].is_highlighted = false
        this.ishilightedAlbum = true
      }
    }
    this.hilightedAlbum = data
  }
  songslectedToHilighte: any = []
  setHilightedSong(data: any, index: any) {
    this.hilightedAlbum = []
    console.log(data);
    if (!data.is_highlighted) {
      data.is_highlighted = true
      this.songslectedToHilighte.push(data.media_id)
    } else {
      this.songslectedToHilighte.splice(index, 1)
      data.is_highlighted = false
    }
    // this.hilightedAlbum = data
    console.log(this.songslectedToHilighte);


  }

  tabChange(index: any) {
    console.log(index, this.tabs[index]);
    for (let i = 0; i < this.tabs.length; i++) {
      this.tabs[i].isSelected = false
    }
    this.tabs[index].isSelected = true
    this.tabName = this.tabs[index].name
    console.log(index, this.tabs[index]);
  }
  music: any = []
  getMusics() {
    this.isSpinner = true
    this.comService.music().subscribe((res: any) => {
      this.music = res.results
      if(res){
        this.isSpinner = false
        for (let i = 0; i < this.music.length; i++) {
          this.music[i]['isPlaying'] = false
        }
      }
     
    },error=>{
      this.isSpinner = false
      this._snackBar.open("Somthing went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  playLists: any = []
  getPlayList() {
    this.isSpinner = true
    this.comService.playlist().subscribe((res: any) => {
      // console.log(res);
     if(res){
      this.playLists = res.data
      this.isSpinner = false
      for (let i = 0; i < this.playLists.length; i++) {
        if (this.playLists[i].is_highlighted) {
          this.selectedAlbum = this.playLists[i]
          this.ishilightedPlaylist = true
        } 
      }
     }
    },error=>{
      this.isSpinner = false
      this._snackBar.open("Somthing went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  listOfAlbum: any = []
  selectedAlbum: any=[]
  selectedAlbumTrackLength=0
  getAlbum() {
    this.selectedAlbum = []
    this.isSpinner = true
    this.comService.album().subscribe((res: any) => {
      // console.log(res);
      if (res) {
        this.listOfAlbum = res.data
        for (let i = 0; i < this.listOfAlbum.length; i++) {
          if (this.listOfAlbum[i].is_highlighted) {
            this.selectedAlbum = this.listOfAlbum[i]
            this.selectedAlbumTrackLength=this.selectedAlbum.tracks.length
            for (let j = 0; j < this.selectedAlbum.tracks.length; j++) {
              this.selectedAlbum.tracks[j]['isPlaying'] = false
              if (this.listOfAlbum[i].is_highlighted) {
                this.ishilightedAlbum = true
              } 
            }
          }
        }
        this.isSpinner=false
      }
    },error=>{
      this.isSpinner = false
      this._snackBar.open("Somthing went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }

  listOfPopularSongs: any = []

  getSongs() {
    this.isSpinner = true
    this.songslectedToHilighte=[]
    this.comService.songs().subscribe((res: any) => {
      if(res){
        this.listOfPopularSongs = res.data
        // console.log(this.listOfPopularSongs);
        for(let i=0; i<this.listOfPopularSongs.length; i++){
          if(this.listOfPopularSongs[i].is_highlighted){
            this.songslectedToHilighte.push(this.listOfPopularSongs[i].media_id)
            this.listOfPopularSongs[i].is_highlighted = true
            this.listOfPopularSongs[i]["isPlaying"] = false
          }
        }
        this.isSpinner = false
      }
    },error=>{
      this.isSpinner = false
      this._snackBar.open("Somthing went wrong", "Ok", {
        duration: 2000,
        panelClass: ['error']
      })
    })
  }
  playPopular=false
  popularSrc:any
  playPopularTrack(singalPlay:any,index:number){
    let m:any=document.getElementById("popularTrackMusic")
    console.log(this.listOfPopularSongs);
    m.src=singalPlay.song_file
    
    if (!singalPlay.isPlaying) {
      for (let i = 0; i < this.listOfPopularSongs.length; i++) {
        this.listOfPopularSongs[i].isPlaying = false
        m.pause()
      }
      this.listOfPopularSongs[index].isPlaying=true
      m.play()
    } else{
      m.pause()
      this.listOfPopularSongs[index].isPlaying = false
    }
    
  }
  src: any
  timeAudio: any = 0
  isPlayAlbum = true
  playAlbum() {
    if(this.selectedAlbumTrackLength>0){
      var audio: any = document.getElementById("myAudio");
      if (this.isPlayAlbum) {
        this.play(this.selectedAlbum.tracks[0], 0, true)
        this.isPlayAlbum = false
      } else{
        for (let i = 0; i < this.selectedAlbum.tracks.length; i++) {
          this.selectedAlbum.tracks[i].isPlaying = false
          audio.pause()
          this.isPlayAlbum = true
         
        }
      }
    }
  
  }
  play(musicDetails: any, index: any, isPlaying: boolean) {
    console.log(musicDetails, isPlaying);
    var audio: any = document.getElementById("myAudio");
    this.src = musicDetails.song_file
    audio.src = this.src
    // this.isPlayAlbum = true
   if(isPlaying){
    for (let i = 0; i < this.selectedAlbum.tracks.length; i++) {
      this.selectedAlbum.tracks[i].isPlaying = false
      audio.pause()
    }
    this.selectedAlbum.tracks[index].isPlaying = isPlaying
    audio.play()
    this.isPlayAlbum=false
   }else{
    audio.pause()
    this.isPlayAlbum=true
  }

  }
  saveChangesSongs(){
    this.isSpinner = true
    console.log(this.hilightedAlbum);
    console.log(this.hilightedAlbum);

    let data = {
      "media_type": "",
      "media_id": this.hilightedAlbum.media_id
    }
    if (this.tabNameSong == "Songs") {

      data.media_type = "song"
      data.media_id = this.songslectedToHilighte
    }
    this.comService.highlight(data).subscribe((res: any) => {
      if (res) {
       
        if(this.tabNameSong=="Songs"){
          this.getSongs()
        }
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
  saveChanges() {
    this.isSpinner = true
    console.log(this.hilightedAlbum);
    console.log(this.hilightedAlbum);

    let data = {
      "media_type": "",
      "media_id": this.hilightedAlbum.media_id
    }
    if (this.tabName == "Album") {
      data.media_type = "album"
    }
    
    if (this.tabName == "Playlist") {
      data.media_type = "playlist"
    }
    this.comService.highlight(data).subscribe((res: any) => {
      if (res) {
        if(this.tabName=="Album"){
          this.getAlbum()
        }
        if(this.tabNameSong=="Songs"){
          this.getSongs()
        }
        if(this.tabName=="Playlist"){
          this.getPlayList()
        }
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
  @Input()  musicarea:any
  popularSection=true
  hideUnHide() {
      if(this.musicarea){
        this.musicarea=false
      }else{
        this.musicarea=true
      }
      let data={
        section:"Music",
        action:this.musicarea
      }
      this.newItemEvent.emit(data)
    
  }
  hideUnHidePopular(){
      // if(this.popularSection){
      //   this.popularSection=true
      // }else{
      //   this.popularSection=false
      // }
      let data={
        section:"PopularTracks",
        action:this.popularSection
      }
      console.log(this.popularSection);
      
      this.hideUnhideSection(data)
    
  }
  hideUnhideSection(event:any) {
    let data = {
      "section": event.section,
      "action": event.action
    }
   
    this.comService.hideSection(data).subscribe((res: any) => {
      if (res) {
        if(event.action){
          this._snackBar.open( event.section+" "+"Unhidden Successfully", "Ok", {
            duration: 2000,
            panelClass: ['success']
          })
        }else{
          this._snackBar.open(event.section+" "+"Hidden Successfully", "Ok", {
            duration: 2000,
            panelClass: ['success']
          })
        }
      //  this.getSection()
      }
    }, error => {
      this.isSpinner = false
      this._snackBar.open(error.error, "Ok", {
        duration: 20000,
        panelClass: ['error']
      })
    })
  }
  listofHidenSection:any=[]
    getSection() {
      this.isSpinner = true
      this.comService.getAllsetion().subscribe((res: any) => {
        console.log(res);
        if (res) {
          this.listofHidenSection = res.data
         let popularSection= this.listofHidenSection.find((o:any) => o.section === "PopularTracks");
         if(popularSection!=undefined){
          this.popularSection=popularSection.action
         }else{
          this.popularSection=false
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
