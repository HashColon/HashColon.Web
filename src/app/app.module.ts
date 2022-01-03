import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { environment } from '../environments/environment';

import { BackendConnectorModule } from '@HashColon/backend-connector/backend-connector.module';
import { BlogModule } from '@Blog/blog.module';
import { FlukeSharpModule } from '@FlukeSharp/fluke-sharp.module';
import { ImageModule } from './shared/image/image.module';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './shared/auth.service';
import { BackendConnectorService } from './shared/backend-connector/backend-connector.service';

import { AppComponent } from './app.component';
import { WebHomeComponent } from './shared/web-home/web-home.component';



@NgModule({
  declarations: [
    AppComponent,
    WebHomeComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    MatButtonModule, MatCardModule, MatIconModule,
    MatMenuModule, MatToolbarModule, MatTooltipModule,
    AppRoutingModule, BlogModule, BackendConnectorModule,
    FlukeSharpModule, ImageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage())
  ],
  providers: [AuthService, BackendConnectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }


