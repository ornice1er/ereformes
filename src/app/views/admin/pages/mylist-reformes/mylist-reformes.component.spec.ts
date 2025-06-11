import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MylistReformesComponent } from './mylist-reformes.component';

describe('MylistReformesComponent', () => {
  let component: MylistReformesComponent;
  let fixture: ComponentFixture<MylistReformesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MylistReformesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MylistReformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
