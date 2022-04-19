import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfftimeComponent } from './offtime.component';

describe('OfftimeComponent', () => {
  let component: OfftimeComponent;
  let fixture: ComponentFixture<OfftimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfftimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfftimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
