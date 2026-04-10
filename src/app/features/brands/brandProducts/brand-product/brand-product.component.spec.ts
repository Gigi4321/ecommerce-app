import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandProductComponent } from './brand-product.component';

describe('BrandProductComponent', () => {
  let component: BrandProductComponent;
  let fixture: ComponentFixture<BrandProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandProductComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
