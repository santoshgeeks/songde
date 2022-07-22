import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileChievementsComponent } from './profile-chievements.component';

describe('ProfileChievementsComponent', () => {
  let component: ProfileChievementsComponent;
  let fixture: ComponentFixture<ProfileChievementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileChievementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileChievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
