import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReformeComponent } from './update-reforme.component';

describe('UpdateReformeComponent', () => {
  let component: UpdateReformeComponent;
  let fixture: ComponentFixture<UpdateReformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReformeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
