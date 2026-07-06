import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortaliteList } from './mortalite-list';

describe('MortaliteList', () => {
  let component: MortaliteList;
  let fixture: ComponentFixture<MortaliteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MortaliteList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortaliteList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
