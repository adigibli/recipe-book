import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  itemMenuSelected: string = 'recipes';

  onMenuSelected(selected: string){
    this.itemMenuSelected = selected;
  }
}
