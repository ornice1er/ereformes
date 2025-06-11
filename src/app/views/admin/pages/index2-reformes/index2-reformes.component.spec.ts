import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Index2ReformesComponent } from './index2-reformes.component';

describe('Index2ReformesComponent', () => {
  let component: Index2ReformesComponent;
  let fixture: ComponentFixture<Index2ReformesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Index2ReformesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Index2ReformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
