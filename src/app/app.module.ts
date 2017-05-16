import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {RouterModule, Router} from '@angular/router';
import {JwtHelper} from 'angular2-jwt';
import * as $ from 'jquery';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MomentModule} from 'angular2-moment';
import {CurrencyMaskModule} from "ng2-currency-mask";

import {appRoutes} from './app.routing';
import {AuthGuard} from './guards/auth.guard';
import {AuthenticationService} from './services/authentication.service';
import {AuthHttpService} from './services/auth-http.service';
import {AuthHttpConfigService} from './services/auth-http-config.service';
import {LoadingService} from './components/loading/loading.service';
import {ConfirmService} from './components/confirm/confirm.service';
import {AlertService} from './components/alert/alert.service';
import {Ng2OrderModule} from 'ng2-order-pipe';

//import theme
import {NgaModule} from './theme/nga.module';
import {GlobalState} from './global.state';

//App components
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MainComponent} from './components/main/main.component';
import {LoadingComponent} from './components/loading/loading.component';
import {PrintComponent} from './components/print/print.component';
import {ConfirmComponent} from './components/confirm/confirm.component';
import {AlertComponent} from './components/alert/alert.component';
import {AdminPostsComponent} from './components/admin-posts/admin-posts.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MainComponent,
    LoadingComponent,
    PrintComponent,
    ConfirmComponent,
    AlertComponent,
    AdminPostsComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgaModule.forRoot(),
    MomentModule,
    CurrencyMaskModule,
    Ng2OrderModule
  ],
  providers: [
    GlobalState,
    JwtHelper,
    AuthGuard,
    AuthenticationService,
    LoadingService,
    ConfirmService,
    AlertService,
    {
      provide: AuthHttpService,
      useFactory: AuthHttpConfigService,
      deps: [Http, Router]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
