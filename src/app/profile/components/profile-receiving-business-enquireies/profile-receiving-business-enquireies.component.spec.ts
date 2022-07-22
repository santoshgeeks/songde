import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReceivingBusinessEnquireiesComponent } from './profile-receiving-business-enquireies.component';

describe('ProfileReceivingBusinessEnquireiesComponent', () => {
  let component: ProfileReceivingBusinessEnquireiesComponent;
  let fixture: ComponentFixture<ProfileReceivingBusinessEnquireiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileReceivingBusinessEnquireiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileReceivingBusinessEnquireiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
