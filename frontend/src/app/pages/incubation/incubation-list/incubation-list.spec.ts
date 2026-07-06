import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncubationList } from './incubation-list';

describe('IncubationList', () => {
  let component: IncubationList;
  let fixture: ComponentFixture<IncubationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncubationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncubationList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
