import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexReformeComponent } from './index-reforme.component';

describe('IndexReformeComponent', () => {
  let component: IndexReformeComponent;
  let fixture: ComponentFixture<IndexReformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexReformeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexReformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
