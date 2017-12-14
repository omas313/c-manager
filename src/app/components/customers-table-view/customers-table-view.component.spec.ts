import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersTableViewComponent } from './customers-table-view.component';

describe('CustomersTableViewComponent', () => {
  let component: CustomersTableViewComponent;
  let fixture: ComponentFixture<CustomersTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
