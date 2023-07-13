// import { latLng, tileLayer, marker } from 'leaflet';
import * as L from 'leaflet'

const picUrl = '../../assets/img/'

const assets = "../../assets/"
const iconRetinaUrl = picUrl+'marker-icon-2x.png';
const iconUrl = picUrl+'marker-icon.png';
const shadowUrl = picUrl+'marker-shadow.png';

export const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [-3, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

export const markerIcon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  // specify the path here
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png"
});

export const blueIcon = L.icon({
  iconUrl: picUrl+'blue-icon.png',
  shadowUrl: picUrl+'marker-shadow.png',

  iconSize:     [50, 50], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
  shadowAnchor: [12, 62], // the same for the shadow
  popupAnchor:  [5, -40] // point from which the popup should open relative to the iconAnchor
});

export const greenIcon = L.icon({
  iconUrl: picUrl+'leaf-green.png',
  shadowUrl: picUrl+'leaf-shadow.png',

  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

export const redIcon = L.icon({
  iconUrl: picUrl+'leaf-red.png',
  shadowUrl: picUrl+'leaf-shadow.png',

  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

export const orangeIcon = L.icon({
  iconUrl: picUrl+'leaf-orange.png',
  shadowUrl: picUrl+'leaf-shadow.png',

  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
