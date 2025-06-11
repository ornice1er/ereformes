import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReformeComponent } from './create-reforme.component';

describe('CreateReformeComponent', () => {
  let component: CreateReformeComponent;
  let fixture: ComponentFixture<CreateReformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReformeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
