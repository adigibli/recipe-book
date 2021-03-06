import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  onSaveData(): void{
        this.dataStorageService.storeRecipe();
  }

  onFetchdata(): void{
      this.dataStorageService.fetchRecipe().subscribe();
  }

}
