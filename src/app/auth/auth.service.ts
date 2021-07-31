import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fromEventPattern } from 'rxjs';

import { GoogleAuth2Service } from './google-auth2.service';
import { UserInterface } from './user';
import { StorageService } from '../storage.service';

@Injectable()
export class AuthService {
  static readonly USER_KEY = 'user';

  get isSignedIn$() {
    return fromEventPattern<boolean>((handler: (signedIn: boolean) => void) =>
      this.googleAuth2Service.auth2.isSignedIn.listen(handler)
    );
  }

  constructor(
    private readonly storageService: StorageService,
    private readonly httpClient: HttpClient,
    private readonly googleAuth2Service: GoogleAuth2Service
  ) {}

  async signIn() {
    const guser = await this.googleAuth2Service.auth2.signIn({
      scope: 'profile email'
    });
    const response = guser.getAuthResponse();
    const idToken = response.id_token;
    // validate user (usually on server-side)
    const tokeninfo = await this.httpClient
      .get<{
        sub: string;
        email: string;
        email_verified: boolean;
        name: string;
        picture: string;
        given_name: string;
        family_name: string;
        locale: string;
      }>(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`)
      .toPromise();

    const user = {
      id: tokeninfo.sub,
      name: tokeninfo.name,
      email: tokeninfo.email,
      avatar: tokeninfo.picture
    };
    this.storageService.setItem(AuthService.USER_KEY, user);
    return user;
  }

  async signOut() {
    await this.googleAuth2Service.auth2.signOut();
    this.storageService.removeItem(AuthService.USER_KEY);
  }

  isSignedIn() {
    return this.googleAuth2Service.auth2.isSignedIn.get();
  }

  getUser() {
    return this.storageService.getItem<UserInterface | null>(
      AuthService.USER_KEY,
      null
    );
  }
}
