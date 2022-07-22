import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileQuoteComponent } from './profile-quote.component';

describe('ProfileQuoteComponent', () => {
  let component: ProfileQuoteComponent;
  let fixture: ComponentFixture<ProfileQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
