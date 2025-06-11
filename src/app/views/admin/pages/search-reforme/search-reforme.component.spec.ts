import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReformeComponent } from './search-reforme.component';

describe('SearchReformeComponent', () => {
  let component: SearchReformeComponent;
  let fixture: ComponentFixture<SearchReformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchReformeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchReformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
