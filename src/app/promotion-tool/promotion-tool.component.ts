import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotion-tool',
  templateUrl: './promotion-tool.component.html',
  styleUrls: ['./promotion-tool.component.scss']
})
export class PromotionToolComponent implements OnInit {
  cardsData = [

    {
      icon: "../../assets/icons/cardicon/Toggle.png",
      heading: "Out Now Banners",
      disc: "Get customised banners created exclusively for your release to promote your music on all social media platforms",
      isSbscribed: false
    },
    {
      icon: "../../assets/icons/cardicon/Glob.png",
      heading: "Preview Campaign",
      disc: "Give a sneak peak of  your release to your super fans before the track is made live",
      isSbscribed: true
    },
    {
      icon: "../../assets/icons/cardicon/File.png",
      heading: "Milestone Cards",
      disc: "Celebrate the milestones of your release with your friends and family with these personalised banners",
      isSbscribed: false
    },
    {
      icon: "../../assets/icons/cardicon/Qrcode.png",
      heading: "QR Code",
      disc: "Sell your music with ease with the customised Songdew QR Code on your next concert",
      isSbscribed: true
    },
    {
      icon: "../../assets/icons/cardicon/Linktoggle.png",
      heading: "Smart Link",
      disc: "Get access to the auto generated smart link of your release and promote your music across platforms with ease",
      isSbscribed: false
    },
    {
      icon: "../../assets/icons/cardicon/Savelink.png",
      heading: "Pre Save Link",
      disc: "Generate your Pre-Save link and create Pre-Release Hype for your upcoming track",
      isSbscribed: false
    },
    {
      icon: "../../assets/icons/cardicon/Heartpuls.png",
      heading: "Radio City Freedom Playlisting",
      disc: "Pitch your music to the editorial team of Radio City Freedom for a feature on their online Radio",
      isSbscribed: false
    },
    {
      icon: "../../assets/icons/cardicon/Wifi.png",
      heading: "Radio Gupshup Broadcasting",
      disc: "Pitch your track to be aired on Radio Gupshup – the no.1 radio station in the north east",
      isSbscribed: false
    },
    {
      icon: "../../assets/icons/cardicon/Fitv.png",
      heading: "TV Broadcasting",
      disc: "Get your music video broadcasted on Songdew TV and take your music to 200 Mn music listeners across the country",
      isSbscribed: false
    },
    {
      icon: "../../assets/icons/cardicon/Comment.png",
      heading: "Press Release Campaign",
      disc: "Run a press release campaign and get published in over 100 magazines ",
      isSbscribed: true
    },
  ]
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  goToToolDetails(){
    this.route.navigateByUrl("/promotion/toolDetails")
  }

}
