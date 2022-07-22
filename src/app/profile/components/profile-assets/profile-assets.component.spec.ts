import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAssetsComponent } from './profile-assets.component';

describe('ProfileAssetsComponent', () => {
  let component: ProfileAssetsComponent;
  let fixture: ComponentFixture<ProfileAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAssetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
