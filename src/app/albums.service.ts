import { Injectable } from '@angular/core';
import AlbumData from '../assets/albums_of_the_year.json';
import { Album } from './album.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  private _albums: Observable<Album[]> = of(AlbumData);
  get Albums(): Observable<Album[]> {
    return this._albums;
  }

  set Albums(val: Observable<Album[]>) {
    this._albums = val;
  }
}
