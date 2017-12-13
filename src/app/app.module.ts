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
import { CustomersComponent } from './components/customers/customers.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthService } from './services/auth.service';
import { DbService } from './services/db.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CustomersComponent,
    CustomerDetailComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,    
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
        path: 'customers', 
        component: CustomersComponent, 
        canActivate: [AuthGuard],
        pathMatch: 'full'
      },
      {
        path: 'customers/:id', 
        component: CustomerDetailComponent, 
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
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
