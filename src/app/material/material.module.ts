import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';


const materials = [
  MatTabsModule,
  MatButtonModule
]

@NgModule({
  imports: [materials],
  exports: [materials]
})
export class MaterialModule { }
