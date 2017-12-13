import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppUser } from '../../models/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser: AppUser;

  // responsive collapse button
  isCollapsed = true;
  
  constructor(
    private authService: AuthService,
  ) {}

  async ngOnInit() {
    // we don't need to unsub from these observables 
    // here since we want to see the changes and also there is only
    // one instance of this navbar component in the entire application's
    // lifetime

    // get user changes
    this.authService.appUser$.subscribe(u => this.appUser = u);
  }

  // getChevronDirection() {
  //   return this.isCollapsed ? "fa-chevron-down" : "fa-chevron-up";
  // }
  
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleIfOpen() {
    if (!this.isCollapsed) this.isCollapsed = true;
  }

  logout() {
    this.authService.logout();
  }
}
