import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apyKey = 'ElYbSupTozNcEGznHKQaBD26L2Dj5bwW';
  private apiUrl = 'https://api.giphy.com/v1/gifs'
  private _tagHistory: string[] = []
  public gifsList: Gif[] = []

  constructor(private httpClient: HttpClient) {
    this.loadLocalStorage();
   }
  public organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    //Si el valor ingresado ya existe en el arreglo
    if (this.tagHistory.includes(tag)) {
      //Lo limpiamos y volvemos a llenar filtrando el mismo arreglo con el valor de tag
      this._tagHistory = this._tagHistory.filter((oldTag => oldTag != tag))
    }
    //Insertamos el nuevo tag al inicio
    this._tagHistory.unshift(tag)
    //Limitamos el arreglo a 10 lugares
    this._tagHistory = this._tagHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  get tagHistory() {
    return [...this._tagHistory];
  }
  searchTag(tag: string): void {
    //rompemos el proceso si se da enter con vacio
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    const params = new HttpParams().
      set('api_key', this.apyKey).
      set('q', tag).
      set('limit', '10')
    this.httpClient.get<SearchResponse>(`${this.apiUrl}/search`, {params})
      .subscribe(resp =>{
        this.gifsList = resp.data
      })
  }

  private saveLocalStorage(): void{
    localStorage.setItem('history', JSON.stringify(this._tagHistory))
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;
    this._tagHistory = JSON.parse(localStorage.getItem('history')!)
    if(this._tagHistory.length === 0) return;
    this.searchTag(this._tagHistory[0])
  }
}
