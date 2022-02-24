import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionToolComponent } from './promotion-tool.component';

describe('PromotionToolComponent', () => {
  let component: PromotionToolComponent;
  let fixture: ComponentFixture<PromotionToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
