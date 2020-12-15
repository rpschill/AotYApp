import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Album } from '../album.interface';
import { AlbumsService } from '../albums.service';
import { FilterValue } from '../filterValue.interface';
import { FilterOptionsEnum, FilterOptionsMap } from '../filterOptions.enum';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'alb-album-grid',
  templateUrl: './album-grid.component.html',
  styleUrls: ['./album-grid.component.scss']
})
export class AlbumGridComponent implements OnInit, AfterViewInit {
  filterValue: FilterValue;
  filterTerm = '';

  albums: Album[] = [];
  columns: string[] = [
    'year_released',
    'album_title',
    'album_artist',
    'album_genre'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('optionSelect') optionSelectEl: HTMLSelectElement;
  @ViewChild('filterText') filterTextEl: HTMLInputElement;
  @ViewChild('paginatorEl') paginatorEl: MatPaginator;

  dataSource: MatTableDataSource<Album> = new MatTableDataSource<Album>([]);

  filterOptions: Map<number, string>;
  options;

  paginatorDataLength = 100;
  paginatorPageSize = 10;
  paginatorPageIndex = 1;
  pageIndex = 0;
  totalPages = 0;

  constructor(private albumsService: AlbumsService) { }

  ngOnInit(): void {
    this.initialize();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getTotalPages();
  }

  initialize(): void {
    this.filterOptions = FilterOptionsMap;
    this.options = FilterOptionsEnum;

    this.getAlbums();
  }

  getAlbums(): void {
    this.albumsService.Albums
      .subscribe(data => {
        this.albums = data;
        this.dataSource.data = this.albums;
      });
  }

  createFilter(column: string): void {
    this.dataSource.filterPredicate = (data: Album, filter: string): boolean => {
      let textToSearch;

      if (column === 'year_released') {
        textToSearch = data[column].toString().toLowerCase() || '';
      } else {
        textToSearch = data[column].toLowerCase() || '';
      }

      return textToSearch.indexOf(filter) !== -1;
    };
  }

  applyFilter(event: any): void {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
    this.getTotalPages();
  }

  onSelectionChange(event: MatSelectChange): void {
    if (event.value === '') {
      this.filterTerm = '';
      this.dataSource.filter = this.filterTerm;
    }
  }

  normalizePageIndexInput(pageNumber): void {
    this.paginatorPageIndex = pageNumber + 1;
  }

  normalizePageIndex(ev): void {
    this.pageIndex = ev.target.value - 1;
    this.paginatorPageIndex = ev.target.value;

    this.validateTotalPages(ev.target.value);
  }

  getTotalPages(): number {
    this.totalPages = Math.floor(this.paginatorDataLength / this.paginatorPageSize);
    return this.totalPages;
  }

  validateTotalPages(val: number): void {

    if (val > this.totalPages) {
      this.paginatorPageIndex = this.totalPages;
      this.pageIndex = this.totalPages - 1;
    }

    if (val < 0) {
      this.paginatorPageIndex = 1;
      this.pageIndex = 0;
    }
  }

}
