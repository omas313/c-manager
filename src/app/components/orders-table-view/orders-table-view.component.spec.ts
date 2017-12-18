import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTableViewComponent } from './orders-table-view.component';

describe('OrdersTableViewComponent', () => {
  let component: OrdersTableViewComponent;
  let fixture: ComponentFixture<OrdersTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
