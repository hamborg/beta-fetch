import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsBarComponent } from './tabs-bar/tabs-bar.component';
import { MainMapComponent } from './tabs/main-map/main-map.component';
import { BoardComponent } from './tabs/board/board.component';
import { MessagesComponent } from './tabs/messages/messages.component';
import { HomeComponent } from './home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { HttpClientModule } from '@angular/common/http';

import { FecthesService } from './services/fecthes.service';
import { FetchDetailComponent } from './fetch-detail/fetch-detail.component';
import { FetchCardComponent } from './tabs/board/fetch-card/fetch-card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TabsBarComponent,
    MainMapComponent,
    BoardComponent,
    MessagesComponent,  
    HomeComponent,
    FetchDetailComponent,
    FetchCardComponent,
  ],
  imports: [
    MaterialModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatListModule,
    MatCardModule
  ],
  providers: [FecthesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
