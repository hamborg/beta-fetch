import { Component, OnChanges } from '@angular/core';
// import { FormControl } from '@angular/forms';

import { MapService } from '../../services/map.service';
import { FecthesService } from '../../services/fecthes.service';


@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})

export class MainMapComponent {
  
  title = "Find a fetch!"
  // dist:any;

  constructor(private Map: MapService, private Fetches: FecthesService){}
  
  ngAfterViewInit() {
    this.Map.initMap({lat:55.68, lng:12.3})
    this.Map.fetchMarkers()
    // this.Map.drawCircle()
  }
  
  inputFn(e:any){
    // NB: 'dist' skal en dag bare hentes fra noget settings-halløj

    // this.dist = Number(e.target.value) // Denne behøves ikke. Vi kan bare gemme direkte i MapService-variable!
    this.Map.filterDist = Number(e.target.value)
    this.Map.fetchMarkers()
    this.zoomToBounds()
  }

  //// Map-funktioner:
  zoomToBounds = () => this.Map.setMapBounds(this.Map.commonFeatureGroup)

  show = true
  showCircle = () => this.Map.drawCircle(this.show = !this.show)

  approachingMarker = () => this.Map.isMarkerInView()
  
  nyPlacering:any;
  newMarkers:any = [];
  placer = false
  
  placeMarker():void {
    if(this.placer = !this.placer){
      this.newMarkers.push(this.Map.aimNewSpot())
    } else {
      // Hent ny position. (Senere kan det sendes til DB)
      this.nyPlacering = this.Map.confirmSpot(this.newMarkers[this.newMarkers.length-1]);
      
      console.log('nyPlacering',this.nyPlacering)
      console.log('newMarker:',this.newMarkers[0])
    }
  }
  
  centerMe() {
    this.Map.centerMe()
  }
  
  
  //// Fetch-liste-funktioner:
  
  allFetches:any = [];
  
  createFetchList(){
    this.Fetches.FetchDB.Collection.forEach(f => {
      this.allFetches.push(f)
    })
    console.log(this.allFetches)
    
    this.createFetchList = () => this._noop()
  }
  
  clickListItem(f:any){
    this.title = f.request.headline // test for at få page-title til at ændre sig...
    
    this.Map.isMarkerInView(f)
    this.Map.focusOn(f)
    // GØR TING HER!
  }  


  // Tom funktion
  _noop = (msg:any="(Ingen ting)") => console.log(msg) 
  
  
// OLD:
  _findPeople(){
    // this.fetchedMarkers = this.Map.fetchMarkers()
    console.log('udgået function...')
    this._findPeople = () => this._noop("Udgået!") // omdiregerer til tom funktion.
  }

}