import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion-home',
  templateUrl: './promotion-home.component.html',
  styleUrls: ['./promotion-home.component.scss']
})
export class PromotionHomeComponent implements OnInit {
  listOfMusic:any=[]
  listOfUploadedMusic=[
    {
      songName: "The Idea Of Her",
      songImage: "../../assets/image/Musigimage.png",
      publishedOn: "Jul 1, 2021",
      noOfPlays: 0,
      disc:"Shitalchandra Kulkarni",
      noOfClaps: 0
    },
    {
      songName: "The Idea Of Her",
      songImage: "../../assets/image/Musigimage.png",
      publishedOn: "Jul 1, 2021",
      noOfPlays: 0,
      disc:"Shitalchandra Kulkarni",
      noOfClaps: 0
    },
    {
      songName: "The Idea Of Her",
      songImage: "../../assets/image/Musigimage.png",
      publishedOn: "Jul 1, 2021",
      noOfPlays: 0,
      disc:"Shitalchandra Kulkarni",
      noOfClaps: 0
    },
    {
      songName: "The Idea Of Her",
      songImage: "../../assets/image/Musigimage.png",
      publishedOn: "Jul 1, 2021",
      noOfPlays: 0,
      disc:"Shitalchandra Kulkarni",
      noOfClaps: 0
    },
    {
      songName: "The Idea Of Her",
      songImage: "../../assets/image/Musigimage.png",
      publishedOn: "Jul 1, 2021",
      noOfPlays: 0,
      disc:"Shitalchandra Kulkarni",
      noOfClaps: 0
    },
    {
      songName: "The Idea Of Her",
      songImage: "../../assets/image/Musigimage.png",
      publishedOn: "Jul 1, 2021",
      noOfPlays: 0,
      disc:"Shitalchandra Kulkarni",
      noOfClaps: 0
    }
  ]
  uploadMusicFile(){
    this.listOfMusic=this.listOfUploadedMusic
  }
  constructor() { }

  ngOnInit(): void {

  }

}
