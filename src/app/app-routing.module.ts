import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMapComponent } from './tabs/main-map/main-map.component';
import { BoardComponent } from './tabs/board/board.component';
import { MessagesComponent } from './tabs/messages/messages.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "",
    redirectTo : "home",
    pathMatch: "full"
    },
  {
    path: "home",
    component: HomeComponent
    },
  {
    path: "map",
    component: MainMapComponent
  },
  {
    path: "board",
    component: BoardComponent
  },
  {
    path: "messages",
    component: MessagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
