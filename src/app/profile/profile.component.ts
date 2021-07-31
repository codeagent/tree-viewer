import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { UserInterface } from '../auth/user';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input() user!: UserInterface | null;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  async signOut() {
    await this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
