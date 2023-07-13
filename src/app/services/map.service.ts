import { Injectable, AfterViewInit } from '@angular/core';

import * as L from 'leaflet'
import { iconDefault, markerIcon, blueIcon, greenIcon, redIcon, orangeIcon } from "../../assets/img/icons";
import { FecthesService } from './fecthes.service';
import { Router } from '@angular/router'; // NB: Måske 'ActivatedRoute' til at sende data på tværs af comps?
// import { Geolocation } from '@ionic-native/geolocation/ngx';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  // NOTE:
  // Alle variabler (der ikke er 'private') herinde er tilgængelige i components, der benytter sig af MapService!!!!
  // Udnyt det! (... hvad det så end betyder...)

  map: any;

  filterDist: number = 100000; // Ikke brugt/arbejdet med endnu
  mySpot: L.LatLngExpression = { lat: 55.5834, lng: 13.00575 } // En dag kommer der noget geolocation her. // lat:55.665,lng:12.53
  // myRadius: any = () => L.circle(this.mySpot).setRadius(this.filterDist)
  myRadius2: any = L.circle(this.mySpot, { radius: 2000 })
  myHomeMarker: L.Marker = this.markMySpot() // NB: skal være 'any' hvis der ikke assignes noget.
  commonFeatureGroup: L.FeatureGroup = L.featureGroup().addLayer(this.myHomeMarker) // Samler ALLE synlige markers i én feature group. Starter med MySpot.
  newMarkersFeatureGroup: L.FeatureGroup = L.featureGroup(); // Skal samle alle NYE markers i en feature group.

  // Options
  animationTime = { duration: 2 }


  constructor(private fetchService: FecthesService, private router: Router) { }

  // Board Map:
  boardMap(f: any, id: number) {
    const options = { dragging: false, tap: false }
    const fLatlng = this.fetchService.getLatLng(f)

    this.map = L.map('fmap' + id, options)
    this.map.removeControl(this.map.zoomControl).removeControl(this.map.attributionControl)
      .setView(L.latLng(fLatlng), 17)
      .on('click', (e: any) => {
        console.log('card-map-click: ', e)

        this.router.navigate(['/map'])

        setTimeout(() => {
          this.fetchMarkers()
          this.focusOn(f)
        }, 100);
      })

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    L.Marker.prototype.options.icon = iconDefault;
    L.marker(fLatlng).addTo(this.map)
  }


  // Main Map:
  initMap(initLatlng: L.LatLngExpression = this.mySpot): void {
    const options = {}

    this.map = L.map('htmlMap', options)
    this.map.removeControl(this.map.zoomControl).removeControl(this.map.attributionControl)
      .setView(initLatlng, 10)
      .on('click', function (e: any) { console.log("event:", e) })

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    L.Marker.prototype.options.icon = iconDefault;

    this.commonFeatureGroup ? this.commonFeatureGroup.addTo(this.map) : null // Inkluderer mySpot

  }

  isMarkerInView(f?:any) {
    // ØVELSE:  Få denne funktion til at printe/returnere alle markers.
    //          Det kan bruges til at opdatere listen over fetches.
    //          Det kan også bruges til at åbne tooltip, når marker kan ses i et vist zoom-level.
    // NB:      Lige nu bruges 'fetch' (f), og ikke 'marker'...

    this.allFetchMarkers.forEach((marker:L.Marker) => {
  
        if (Math.round(this.map.distance(marker.getLatLng(), this.map.getCenter())) < 5000 ) {
          console.log('Marker LatLng: ',marker.getLatLng())
          // ØVELSE:  Få nu fat i zoom level i en 'if'
          //          Åbn derefter tooltip på marker. F.eks. i en settimeout()
        }
    })

    // Print fetch
    f? console.log('Kan marker ',f,' ses?\n', this.map.getBounds().contains(this.fetchService.getLatLng(f))) : null
  }

  drawCircle(show = true) {
    show
      ? this.map.hasLayer(this.myRadius2) // Findes dist-cirkel allerede på map?
        ? this.myRadius2.setRadius(this.filterDist)
        : this.myRadius2.addTo(this.map)
      : this.myRadius2.removeFrom(this.map)
  }

  // Centrér min position
  centerMe() {
    this.map.flyTo(this.mySpot, 12);
  }

  // Sæt en marker i mit spot
  markMySpot(pos: L.LatLngExpression = this.mySpot): L.Marker {
    return L.marker(pos)
      .bindPopup("I'm <b>alive</b>!<br>... Although I'm just a test :(")
    // Der skal noget GeoLocation-halløj ind her. // Rettelse: Det skal måske klares direkte i 'mySpot'(?).
  }

  // Ændr marker og popup, der placeres i midten af kort
  markerToggle(flip: number, marker?: L.Marker): L.Marker {
    marker
      ? marker = marker
      : marker = L.marker(this.map.getCenter())

    return flip < 0.5
      ? marker // Når marker skal placeres
        .setIcon(blueIcon)
        .setOpacity(0.5)
        .bindPopup('Sæt mig ned!')
        .addTo(this.map)
        .openPopup()

      : marker // Når marker bliver sat
        .setOpacity(1)
        .bindPopup('<a href="board">Gå til Board</a>')
        .setIcon(iconDefault)
        .addTo(this.newMarkersFeatureGroup)
  }

  aimNewSpot() {
    let aimMarker = this.markerToggle(0) // Returnerer en ny Marker
    this.map.on('move', () => {
      setTimeout(() => {
        aimMarker.setLatLng(this.map.getCenter()).openPopup()
      }, 0.5) // Dette for at undgå: "ERROR RangeError: Maximum call stack size exceeded"
    })

    return aimMarker
  }

  confirmSpot(newMarker: any) {
    let myNewSpot: any = {}

    this.markerToggle(1, newMarker)
    this.map.off('move')

    myNewSpot.distance = newMarker.getLatLng().distanceTo(this.mySpot)
    myNewSpot.pos = newMarker.getLatLng()

    return myNewSpot
  }

  focusOn(f: any) {
    console.log('vi fokuserer!!!', f)
    this.map.flyTo(this.fetchService.getLatLng(f), 17, this.animationTime)
  }
  fetchPopup(marker: any, f: any) {
    const afstand = this.afstand(this.fetchService.getLatLng(f), this.mySpot)

    const popUp: any = {
      name: f.user.name,
      location: f.location.name,
      head: f.request.headline,
      content: f.request.text,
      thing: f.request.thing,
      price: f.request.price
    }

    marker.bindPopup(`
      <h5>:: ${popUp.thing}</h5>
      <h1>${popUp.head}</h1>
      <p><i>${popUp.content}</i></p>
      <button mat-button class="PObtn">NY funktion virker!</button>
      <h6>${popUp.name} - ${popUp.location}<br>${afstand}</h6>
    `)

      .bindTooltip(`
      <b>${popUp.thing}</b><br>Price: ${popUp.price}
    `)

    // PRØV: Få tooltip til at vise sig, når man pan'er hen til markeren i et bestemt zoom-niveau.
    // Det giver nok mening, at den skal være tæt på midten af kortet.

  }

  afstand(d1: L.LatLngExpression, d2: L.LatLngExpression): string {
    let distInMeters = Math.round(this.map.distance(d1, d2));
    let distVal = distInMeters > 1000 ? Math.round(distInMeters / 1000) : distInMeters
    let distUnit = distInMeters > 1000 ? " km" : " m"
    return distInMeters > 0
      ? distVal + distUnit
      : "(Ukendt afstand)"
  }

  allFetchMarkers: any = [];
  fetchMarkers(dist = this.filterDist): L.FeatureGroup { // NB: Hvad er forskellen (pros/cons) på FeatureGroup og LayerGroup?
    console.log("FetchMarkers blev fyret af med:", dist, " i distance.")

    this.allFetchMarkers = []
    this.commonFeatureGroup.clearLayers()
    this.commonFeatureGroup.addLayer(this.myHomeMarker)
    // this.commonFeatureGroup.addLayer(this.newMarkersFeatureGroup) // NB: Virker ikke helt...

    // NB: vi glemmer de nye markers... Hvordan får man dem med? 'newMarkersFeatureGroup'? Er det vigtigt?

    this.fetchService.FetchDB.Collection.forEach(f => {

      if (Math.round(this.map.distance(this.fetchService.getLatLng(f), this.mySpot)) < dist) {
        // console.log(f)
        const fMarker = L.marker(this.fetchService.getLatLng(f))
        this.fetchPopup(fMarker, f)

        this.allFetchMarkers.push(fMarker)
        this.commonFeatureGroup.addLayer(fMarker) // NB: Vi behøver tilsyneladende ikke 'addTo(map)'.
      }
    })

    console.log('feature group bounds:', this.commonFeatureGroup.getBounds())

    this.drawCircle() // Kalder på function, der tegner filter-radius

    return this.commonFeatureGroup; // feature group
  }

  setMapBounds(group: L.FeatureGroup): void {
    //NB: Kan man indbygge lidt tolerance her?
    this.map.flyToBounds(group.getBounds(), this.animationTime)
  }
}
