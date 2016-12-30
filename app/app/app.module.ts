import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from "@angular/flex-layout";
import {AuthHttp} from 'angular2-jwt';
import {Http} from '@angular/http';

import {AppComponent} from './app.component';

import {appRoutes} from './app.routing';
import {AdminComponent} from './components/admin/admin.component';
import {AdminLoginComponent} from './components/admin/admin-login/admin-login.component';
import {ClientHomeComponent} from './components/client/client-home/client-home.component';
import {AdminDashboardComponent} from './components/admin/admin-dashboard/admin-dashboard.component';

import {AuthGuardService} from './services/auth-guard.service';
import {AuthenticationService} from './services/authentication.service';
import {AdminPostsComponent} from './components/admin/admin-posts/admin-posts.component';
import {AdminUsersComponent} from './components/admin/admin-users/admin-users.component';

import {AuthHttpService} from './services/auth-http.service';
import {TruncateTextPipe} from './pipes/truncate-text.pipe';
import {AdminPostsFormComponent} from './components/admin/admin-posts/admin-posts-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminLoginComponent,
    ClientHomeComponent,
    AdminDashboardComponent,
    AdminPostsComponent,
    AdminUsersComponent,
    TruncateTextPipe,
    AdminPostsFormComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuardService,
    AuthenticationService,
    {
      provide: AuthHttp,
      useFactory: AuthHttpService,
      deps: [Http]
    }
  ],
  entryComponents: [AdminPostsFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
