import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool-details',
  templateUrl: './tool-details.component.html',
  styleUrls: ['./tool-details.component.scss']
})
export class ToolDetailsComponent implements OnInit {
  imactOFQr=false
  ependDropDown=false
  playingData: any = {
    songName: "The Idea Of Her",
    songImage: "../../assets/image/Musigimage.png",
    publishedOn: "Jul 1, 2021",
    noOfPlays: 0,
    disc:"Shitalchandra Kulkarni",
    noOfClaps: 0
  }
  allTracks=[
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
  constructor() { }

  ngOnInit(): void {
  }

}
