import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import * as fetchesImport from "../../assets/data/fetches.json"

 

@Injectable({
  providedIn: 'root'
})

export class FecthesService {
  // db = "mongodb+srv://lasse:hamborg@mystartercluster.nmsq3.mongodb.net/"
  public FetchDB = fetchesImport;

  constructor() { } //private http: HttpClient

  getLatLng(fetch:any){
    return fetch.location.latlng;
  }

}
