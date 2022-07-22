import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {

  
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
  activateChipe = true
  chipsTab = [
    { chipName: "All", selected: true },
    { chipName: "Free", selected: false },
    { chipName: "Premium subscription", selected: false },
    { chipName: "Ala Carte", selected: false },
  ]

 
  constructor() { }

  ngOnInit(): void {
  }
  

}
