import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowReformeComponent } from './follow-reforme.component';

describe('FollowReformeComponent', () => {
  let component: FollowReformeComponent;
  let fixture: ComponentFixture<FollowReformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowReformeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowReformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
