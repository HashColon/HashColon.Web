import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { BackendConnectorService } from './shared/backend-connector/backend-connector.service';
import { HashColonModule, modules, modules_ordered } from './shared/web-home/web-modules';

@Component({
  selector: 'hashcolon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // app title
  title = 'HashColon';
  // top menu
  modules = modules;
  modules_ordered = modules_ordered;
  currentModules: HashColonModule = this.modules['home'];
  // admin login 
  adminState = false;

  constructor(
    private router: Router,
    public auth: AuthService,
    public backend: BackendConnectorService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentModules = this.modules[e.urlAfterRedirects.split('/').filter(data => data)[0]];
      }
    });
  }

  _navigateTo(item: string) {
    this.router.navigate([item]);
  };

  _tryAdmin() {
    if (this.auth.IsAdminAuth()) {
      this.auth.DoAdminSignOut();
      //reload page
      //window.location.reload();
    }
    else {
      this.auth.DoAdminSignIn();
      //window.location.reload();
    }

  };

  _test() {
    //console.log(this.auth.currentUser);
  }

}
