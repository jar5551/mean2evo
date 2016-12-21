import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';

//import {routing, routedComponents} from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    //routedComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
    //routing //TODO implement routing. Consider ui router or angykar routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
