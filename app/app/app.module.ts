import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {RouterModule, Router} from '@angular/router';
import {FlexLayoutModule} from "@angular/flex-layout";
import {JwtHelper, AuthConfig} from 'angular2-jwt';
import {Http} from '@angular/http';

import {AppComponent} from './app.component';

import {appRoutes} from './app.routing';
import {AdminComponent} from './admin/components/admin.component';
import {AdminLoginComponent} from './admin/components/admin-login/admin-login.component';
import {ClientHomeComponent} from './client/components/client-home/client-home.component';
import {AdminDashboardComponent} from './admin/components/admin-dashboard/admin-dashboard.component';

import {AuthGuardService} from './services/auth-guard.service';
import {AuthenticationService} from './services/authentication.service';
import {AdminPostsComponent} from './admin/components/admin-posts/admin-posts.component';
import {AdminUsersComponent} from './admin/components/admin-users/admin-users.component';

import {AuthHttpConfigService} from './services/auth-http-config.service';
import {TruncateTextPipe} from './pipes/truncate-text.pipe';
import {AdminPostsFormComponent} from './admin/components/admin-posts/admin-posts-form.component';

import {AuthHttp} from './services/auth-http.service';
import {LoadingService} from './components/loading-indicator/loading.service';
import {LoadingIndicatorComponent} from './components/loading-indicator/loading-indicator.component';

import {Ng2SmartTableModule } from 'ng2-smart-table';

//Import theme
import { NgaModule } from './theme/nga.module';
import { GlobalState } from './global.state';


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
    AdminPostsFormComponent,
    LoadingIndicatorComponent
  ],
  imports: [
    Ng2SmartTableModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgaModule.forRoot(),
  ],
  providers: [
    LoadingService,
    JwtHelper,
    AuthGuardService,
    GlobalState,
    AuthenticationService,
    {
      provide: AuthHttp,
      useFactory: AuthHttpConfigService,
      deps: [Http, Router]
    }
  ],
  entryComponents: [AdminPostsFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
