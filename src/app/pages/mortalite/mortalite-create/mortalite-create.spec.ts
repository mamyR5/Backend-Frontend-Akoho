import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortaliteCreateComponent } from './mortalite-create';

describe('MortaliteCreateComponent', () => {
  let component: MortaliteCreateComponent;
  let fixture: ComponentFixture<MortaliteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MortaliteCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortaliteCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
