import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CustomerCardComponent } from './components/customer-card/customer-card.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomerFormPageComponent } from './components/customer-form-page/customer-form-page.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomersCardViewComponent } from './components/customers-card-view/customers-card-view.component';
import { CustomersMapViewComponent } from './components/customers-map-view/customers-map-view.component';
import { CustomersTableViewComponent } from './components/customers-table-view/customers-table-view.component';
import { CustomersComponent } from './components/customers/customers.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrdersTableViewComponent } from './components/orders-table-view/orders-table-view.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { CustomerService } from './services/customer.service';
import { DbService } from './services/db.service';
import { OrderService } from './services/order.service';
import { UserService } from './services/user.service';
import { CustomDatePipe } from './pipes/custom-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CustomersComponent,
    CustomerDetailComponent,
    CustomerFormComponent,
    CustomerFormPageComponent,
    LoginComponent,
    NotFoundComponent,
    CustomersTableViewComponent,
    CustomersCardViewComponent,
    CustomerCardComponent,
    CustomersMapViewComponent,
    OrdersComponent,
    OrdersTableViewComponent,
    OrderFormComponent,
    CustomDatePipe,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMaps.apiKey
    }),
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    BrowserModule,
    
    RouterModule.forRoot([
      {
        path: '', 
        redirectTo: "home", 
        pathMatch: 'full'
      },
      {
        path: 'home', 
        component: HomeComponent, 
        pathMatch: 'full'
      },
      {
        path: 'login', 
        component: LoginComponent, 
        pathMatch: 'full'
      },
      {
        path: 'orders/new', 
        component: OrderFormComponent, 
        canActivate: [AuthGuard],
        pathMatch: 'full'
      },
      {
        path: 'orders', 
        component: OrdersComponent, 
        canActivate: [AuthGuard],
        pathMatch: 'full'
      },
      {
        path: 'customers/new', 
        component: CustomerFormPageComponent, 
        canActivate: [AuthGuard],
        pathMatch: 'full'
      },
      {
        path: 'customers/edit/:id', 
        component: CustomerFormPageComponent, 
        canActivate: [AuthGuard],
        pathMatch: 'full'
      },
      {
        path: 'customers/details/:id', 
        component: CustomerDetailComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full'
      },
      {
        path: 'customers', 
        component: CustomersComponent, 
        canActivate: [AuthGuard],
        pathMatch: 'full'
      },
      {
        path: '**', 
        component: NotFoundComponent, 
        pathMatch: 'full'
      },
    ])
  ],
  providers: [
    AuthService,
    UserService,
    DbService,
    CustomerService,
    OrderService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
