import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLivePerformacesComponent } from './profile-live-performaces.component';

describe('ProfileLivePerformacesComponent', () => {
  let component: ProfileLivePerformacesComponent;
  let fixture: ComponentFixture<ProfileLivePerformacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileLivePerformacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLivePerformacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
