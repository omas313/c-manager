import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BsDropdownModule, CollapseModule } from 'ngx-bootstrap';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomersComponent } from './components/customers/customers.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { CustomerService } from './services/customer.service';
import { DbService } from './services/db.service';
import { UserService } from './services/user.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomerFormPageComponent } from './components/customer-form-page/customer-form-page.component';
import { CustomersTableViewComponent } from './components/customers-table-view/customers-table-view.component';
import { CustomersCardViewComponent } from './components/customers-card-view/customers-card-view.component';
import { CustomerCardComponent } from './components/customer-card/customer-card.component';
import { AgmCoreModule } from '@agm/core';
import { CustomersMapViewComponent } from './components/customers-map-view/customers-map-view.component';

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
    CustomersMapViewComponent
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
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
