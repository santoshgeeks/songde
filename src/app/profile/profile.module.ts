import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileStoryComponent } from './components/profile-story/profile-story.component';
import { ProfileReceivingBusinessEnquireiesComponent } from './components/profile-receiving-business-enquireies/profile-receiving-business-enquireies.component';
import { ProfileMusicComponent } from './components/profile-music/profile-music.component';
import { ProfileVideoComponent } from './components/profile-video/profile-video.component';
import { ProfilePhotoComponent } from './components/profile-photo/profile-photo.component';
import { ProfileQuoteComponent } from './components/profile-quote/profile-quote.component';
import { ProfileLivePerformacesComponent } from './components/profile-live-performaces/profile-live-performaces.component';
import { ProfileInPressComponent } from './components/profile-in-press/profile-in-press.component';
import { ProfileAssetsComponent } from './components/profile-assets/profile-assets.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileHomeComponent } from './profile-home.component';
import { ProfileChievementsComponent } from './components/profile-chievements/profile-chievements.component';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CDK_DRAG_CONFIG, DragDropModule} from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000
};

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileStoryComponent,
    ProfileChievementsComponent,
    ProfileReceivingBusinessEnquireiesComponent,
    ProfileMusicComponent,
    ProfileVideoComponent,
    ProfilePhotoComponent,
    ProfileQuoteComponent,
    ProfileLivePerformacesComponent,
    ProfileInPressComponent,
    ProfileAssetsComponent,
    ProfileHomeComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    DragDropModule,
    MatSnackBarModule,
    NgxYoutubePlayerModule.forRoot()
  ],
  providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig },DatePipe]
})
export class ProfileModule { }
