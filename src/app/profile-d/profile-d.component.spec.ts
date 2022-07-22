import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDComponent } from './profile-d.component';

describe('ProfileDComponent', () => {
  let component: ProfileDComponent;
  let fixture: ComponentFixture<ProfileDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
