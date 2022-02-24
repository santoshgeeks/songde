import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ProfileComponent } from './profile/profile.component';
import { PromotionHomeComponent } from './promotion-home/promotion-home.component';
import { PromotionComponent } from './promotion/promotion.component';
import { ToolDetailsComponent } from './tool-details/tool-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/promotion-home', pathMatch: 'full' },
  {
    path: "promotion",
    component: PromotionComponent,
  
  },
  { path: "promotion-home", component: PromotionHomeComponent },
  { path: "toolDetails", component: ToolDetailsComponent },
  // {path:"profile", component: ProfileComponent}
 
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
