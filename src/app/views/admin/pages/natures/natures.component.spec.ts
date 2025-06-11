import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturesComponent } from './natures.component';

describe('NaturesComponent', () => {
  let component: NaturesComponent;
  let fixture: ComponentFixture<NaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
