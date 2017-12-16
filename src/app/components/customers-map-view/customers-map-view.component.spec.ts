import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersMapViewComponent } from './customers-map-view.component';

describe('CustomersMapViewComponent', () => {
  let component: CustomersMapViewComponent;
  let fixture: ComponentFixture<CustomersMapViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersMapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
