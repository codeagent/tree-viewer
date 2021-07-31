import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './login/login.component';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { TreeFormComponent } from './tree-form/tree-form.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule
  ],
  declarations: [
    AppComponent,
    TreeViewComponent,
    TreeFormComponent,
    ProfileComponent,
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
