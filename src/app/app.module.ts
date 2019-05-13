import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ThfModule } from '@totvs/thf-ui';
import {ThfKendoModule} from '@totvs/thf-kendo';

import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent
  ],
  imports: [
    BrowserModule,
    ThfModule,
    AppRoutingModule,
    HttpClientModule,
    ThfKendoModule,
    BrowserAnimationsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
