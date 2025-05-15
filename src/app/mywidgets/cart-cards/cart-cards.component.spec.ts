import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCardsComponent } from './cart-cards.component';

describe('CartCardsComponent', () => {
  let component: CartCardsComponent;
  let fixture: ComponentFixture<CartCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
