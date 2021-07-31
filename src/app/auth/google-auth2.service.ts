import { Inject, Injectable, InjectionToken } from '@angular/core';

export const GOOGLE_AUTH2_CLIENT_ID = new InjectionToken<string>(
  'GoogleAuth2ClientId'
);

@Injectable()
export class GoogleAuth2Service {
  get auth2() {
    return this._auth2;
  }

  constructor(
    @Inject(GOOGLE_AUTH2_CLIENT_ID)
    private readonly clientId: string
  ) {}

  private _auth2!: gapi.auth2.GoogleAuth;

  initialize() {
    return new Promise((resolve, reject) =>
      gapi.load('auth2', {
        callback: () =>
          gapi.auth2
            .init({
              ux_mode: 'popup',
              client_id: this.clientId
            })
            .then(e => resolve((this._auth2 = e)), e => reject(e)),
        onerror: reject
      })
    );
  }
}

export const factory = (googleAuth2Service: GoogleAuth2Service) => () =>
  googleAuth2Service.initialize();
