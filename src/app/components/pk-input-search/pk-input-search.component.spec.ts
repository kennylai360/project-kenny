import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PkInputSearchComponent } from './pk-input-search.component';

describe('PkInputSearchComponent', () => {
  let component: PkInputSearchComponent;
  let fixture: ComponentFixture<PkInputSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PkInputSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PkInputSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
