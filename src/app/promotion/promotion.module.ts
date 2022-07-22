import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionRoutingModule } from './promotion-routing.module';
import { PromotionHomeComponent } from './promotion-home/promotion-home.component';
import { ToolDetailsComponent } from './tool-details/tool-details.component';
import { PromotionToolComponent } from './promotion-tool/promotion-tool.component';
import { PromotionComponent } from './promotion/promotion.component';


@NgModule({
  declarations: [
    PromotionComponent,
    PromotionHomeComponent,
    ToolDetailsComponent,
    PromotionToolComponent
  ],
  imports: [
    CommonModule,
    PromotionRoutingModule
  ]
})
export class PromotionModule { }
