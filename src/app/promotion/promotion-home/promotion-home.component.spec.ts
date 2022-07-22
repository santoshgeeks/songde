import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionHomeComponent } from './promotion-home.component';

describe('PromotionHomeComponent', () => {
  let component: PromotionHomeComponent;
  let fixture: ComponentFixture<PromotionHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
