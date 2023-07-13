import { Component, Input } from '@angular/core';
import { MapService } from '../../../services/map.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fetch-card',
  templateUrl: './fetch-card.component.html',
  styleUrls: ['./fetch-card.component.css']
})
export class FetchCardComponent {

  private router = ActivatedRoute;
  
  constructor(private Map: MapService){}

  @Input() f: any; // 'fetch' from parent: 'boardcomp'
  @Input() idx: any; // 'fetch' from parent: 'boardcomp'


  ngAfterViewInit(){
    this.loadMap(this.idx)  
  }

  loadMap(index:number){
    console.log('loadMap skete!')
    this.Map.boardMap(this.f,index)
    // this.idx++;
  }

}
