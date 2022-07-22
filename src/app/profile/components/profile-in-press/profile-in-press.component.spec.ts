import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInPressComponent } from './profile-in-press.component';

describe('ProfileInPressComponent', () => {
  let component: ProfileInPressComponent;
  let fixture: ComponentFixture<ProfileInPressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileInPressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInPressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
