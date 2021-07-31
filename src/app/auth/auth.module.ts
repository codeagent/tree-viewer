import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './auth.service';

import {
  GoogleAuth2Service,
  factory as googleAuth2Initializer,
  GOOGLE_AUTH2_CLIENT_ID
} from './google-auth2.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    GoogleAuth2Service,
    {
      provide: APP_INITIALIZER,
      useFactory: googleAuth2Initializer,
      deps: [GoogleAuth2Service],
      multi: true
    },

    {
      provide: GOOGLE_AUTH2_CLIENT_ID,
      useValue:
        '340786968506-68q0sc0dis5h25kidfrc8k9j0j90t97o.apps.googleusercontent.com'
    },

    AuthService
  ]
})
export class AuthModule {}
