import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 menbers=[
   {name:"Raj Kumar" , experties:"Vocals"},
   {name:"Mike Seter" , experties:"Lead Guitar"},
   {name:"Jatin Jain " , experties:"Drums"},
   {name:"Rose Lewis" , experties:"Key Boards"},
 ]
 achievements=[
   {winnerPosition:"Winner", disc:"Won Best Rock Band of the year waward in 2021"},
   {winnerPosition:"Nominated", disc:"Nominated for most promising emerging talent is Asia"},
   {winnerPosition:"Winner", disc:"Won Best  Music video for BLACK NIGHTS MTV in 2022"},
   {winnerPosition:"Winner",disc:"Winner of an international talent contest"}
 ]
  constructor() { }

  ngOnInit(): void {
  }

}
