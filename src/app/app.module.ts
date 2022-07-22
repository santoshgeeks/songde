import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProfileDComponent } from './profile-d/profile-d.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { JwtInterceptor } from './jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { AlertPopupComponent } from './alert-popup/alert-popup.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ProfileDComponent,
    LoginComponent,
    AlertPopupComponent
  ],
  imports: [
    ImageCropperModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRippleModule,
    MatDialogModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[AlertPopupComponent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],  
  bootstrap: [AppComponent]
})
export class AppModule { }
