import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ThfModule } from '@totvs/thf-ui';

import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { ThfGridModule } from '@totvs/thf-ui/components/thf-grid';

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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    ThfGridModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
