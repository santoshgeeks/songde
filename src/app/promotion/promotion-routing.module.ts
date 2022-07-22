import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromotionHomeComponent } from './promotion-home/promotion-home.component';
import { PromotionComponent } from './promotion/promotion.component';
import { ToolDetailsComponent } from './tool-details/tool-details.component';

const routes: Routes = [
  { path: "promote", component: PromotionComponent},
  { path: "promotion-home", component: PromotionHomeComponent },
  { path: "toolDetails", component: ToolDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionRoutingModule { }
