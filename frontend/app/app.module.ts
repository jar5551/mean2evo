import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from "@angular/flex-layout";
import {AUTH_PROVIDERS} from 'angular2-jwt';

import {AppComponent} from './app.component';
import {PostsComponent} from './components/posts/posts.component';

import {appRoutes} from './app.routing';
import {AdminComponent} from './components/admin/admin.component';
import {AdminLoginComponent} from './components/admin/admin-login/admin-login.component';
import {ClientHomeComponent} from './components/client/client-home/client-home.component';
import {AdminDashboardComponent} from './components/admin/admin-dashboard/admin-dashboard.component';

import {AuthGuardService} from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    AdminComponent,
    AdminLoginComponent,
    ClientHomeComponent,
    AdminDashboardComponent
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
    AUTH_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
