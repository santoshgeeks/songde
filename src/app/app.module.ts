import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PromotionComponent } from './promotion/promotion.component';
import { PromotionToolComponent } from './promotion-tool/promotion-tool.component';
import { FooterComponent } from './footer/footer.component';
import { PromotionHomeComponent } from './promotion-home/promotion-home.component';
import { ProfileComponent } from './profile/profile.component';
import { ToolDetailsComponent } from './tool-details/tool-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PromotionComponent,
    PromotionToolComponent,
    FooterComponent,
    PromotionHomeComponent,
    ToolDetailsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
