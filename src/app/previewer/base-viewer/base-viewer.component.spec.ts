import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseViewerComponent } from './base-viewer.component';

describe('BaseViewerComponent', () => {
  let component: BaseViewerComponent;
  let fixture: ComponentFixture<BaseViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
