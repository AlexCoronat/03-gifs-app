import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text" class="form-control" placeholder="Buscar gifs..." (keyup.enter)="searchTag()" #txtTagInput>
  `
})

export class SearchBoxComponent {
  //Se pasa al decorador la referencia del elemento del cual queremos informacion
  @ViewChild('txtTagInput')

  public tagInput!: ElementRef<HTMLInputElement>
  constructor(private gifsService: GifsService) { }

  searchTag(): void {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
