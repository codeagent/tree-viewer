import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('menu', { static: true })
  private menu!: MatDrawer;

  get isSignedIn() {
    return this.authSevice.isSignedIn();
  }

  get user() {
    return this.authSevice.getUser();
  }

  constructor(
    private readonly authSevice: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.authSevice.isSignedIn$
      .pipe(filter(e => !e))
      .subscribe(() => this.closeMenu());
  }

  toggleMenu() {
    this.menu.toggle();
  }

  closeMenu() {
    this.menu.close();
  }

  async signIn() {
    await this.authSevice.signIn();
    this.router.navigate(['/tree/view']);
  }

  async signOut() {
    await this.authSevice.signOut();
    this.router.navigate(['/login']);
  }
}
