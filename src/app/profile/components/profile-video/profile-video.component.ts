import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-profile-video',
  templateUrl: './profile-video.component.html',
  styleUrls: ['./profile-video.component.scss']
})
export class ProfileVideoComponent implements OnInit {
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
  isSpinner=false
  constructor(private comService:CommonService,  private _snackBar: MatSnackBar,) { }
  player:any;
  private id: string = 'qDuKsiwS5xw';

  savePlayer(player:any) {
    this.player = player;
    console.log('player instance', player);
  }
  onStateChange(event:any) {
    console.log('player state', event.data);
  }
  ngOnInit(): void {
    this.getVideos()
  }

  videosList:any=[]
  displayeHilight:any=[]
  getVideos(){
    this.hilightedAlbum=[]
    this.displayeHilight=[]
    this.isSpinner=true
    this.comService.video().subscribe((res:any)=>{
      console.log(res);
      if(res){
        this.isSpinner=false
        this.videosList=res.data
        for(let i=0; i<this.videosList.length; i++){
          if(this.videosList[i].is_highlighted){
            this.hilightedAlbum.push(this.videosList[i].id)
            this.displayeHilight.push(this.videosList[i])
          }
        }
      }
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
  }
 
  hilightedAlbum:any=[]
  setHilightedSong(data: any, index: any) {
    console.log(data);
    if(this.hilightedAlbum.length<3){
      if (!data.is_highlighted) {
        data.is_highlighted = true
        this.hilightedAlbum.push(data.media_id)
      } else {
        this.hilightedAlbum.splice(index, 1)
        data.is_highlighted = false
      }
    }else{
      if(data.is_highlighted){
        this.hilightedAlbum.splice(index, 1)
        data.is_highlighted = false
      }else{
        alert("You can only select three videos ):")
      }
    }
  }

  saveChanges(){
    let data = {
      "media_type": "video",
      "media_id": this.hilightedAlbum
    }
    this.isSpinner = true
    this.comService.highlight(data).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.getVideos()
        this.isSpinner = false
        this._snackBar.open("Update/Added successfully", "Ok", {
          duration: 2000,
          panelClass: ['success']
        })
      }

    }, error=>{
      this.isSpinner = false
        this._snackBar.open("Deleted successfully", "Ok", {
          duration: 2000,
          panelClass: ['success']
        })
    })
  }
  @Output() newItemEvent:any = new EventEmitter();
  @Input()  videoSection:any
  hideUnHide() {
    if(this.videoSection){
      this.videoSection=false
    }else{
      this.videoSection=true
    }
    console.log(this.videoSection);
    
    let data={
      section:"Video",
      action:this.videoSection
    }
    this.newItemEvent.emit(data)
  }
}
