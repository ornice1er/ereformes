import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowReformeCreateComponent } from './follow-reforme-create.component';

describe('FollowReformeCreateComponent', () => {
  let component: FollowReformeCreateComponent;
  let fixture: ComponentFixture<FollowReformeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowReformeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowReformeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
