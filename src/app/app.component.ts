import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { DbService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private auth: AuthService, 
    private userService: UserService, 
    private dbService: DbService, 
    private router: Router
  ) {

    // we are doing auth check when user log in here also the 
    // returnUrl redirection due to a bug, check authService
    this.auth.user$.subscribe(user => {
      if (!user) return;
      
      // store user in db, since we are using 3rd party (google) for
      // user info, we will always save their data on log in since they
      // may change it without the knowledge of this app
      // if we had a registration form, we would check if its a new user and
      // then save the data in db
      this.userService.save(user);

      // init db connection
      this.dbService.init(user.uid);
      
      // check for redirect url
      const returnUrl = localStorage.getItem("returnUrl");
      if (!returnUrl) {
        if (this.router.url === "/login")
          this.router.navigate(["/home"]);
        return;
      }
      
      // redirect somewhere then get rid of redirect url
      localStorage.removeItem("returnUrl");
      this.router.navigate([returnUrl]);
    });
  }
  
}
