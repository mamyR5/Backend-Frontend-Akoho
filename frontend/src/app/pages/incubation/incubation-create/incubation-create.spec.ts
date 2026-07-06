import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncubationCreate } from './incubation-create';

describe('IncubationCreate', () => {
  let component: IncubationCreate;
  let fixture: ComponentFixture<IncubationCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncubationCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncubationCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
