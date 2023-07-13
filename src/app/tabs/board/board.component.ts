import { Component } from '@angular/core';
import { FecthesService } from '../../services/fecthes.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent {

  constructor(private Fetches: FecthesService, private Map: MapService){}

  ngAfterViewInit(){
    setTimeout(() => {
      this.createFetchList()
    }, 500);
  }

  // Problem: hvordan forbliver man på siden, som den så ud, da man slap den,
  //          når man går frem og tilbage mellem div. sider?
  // Måske noget a la: 'CanReuse', 'page state', 'Destroy' eller såda noget.
  // https://stackoverflow.com/questions/33940095/angular2-routing-keeping-state-of-component-when-route-changes/36010817#36010817


  allFetches:any = [];
  createFetchList(){
    this.Fetches.FetchDB.Collection.forEach(f => {
      this.allFetches.push(f)
    })
    console.log(this.allFetches)
    
    this.createFetchList = () => this._noop()
  }
  

  // Tom funktion
  _noop = (msg:any="(Ingen ting)") => console.log(msg) 

}
