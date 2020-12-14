import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FilterValue } from './filterValue.interface';

@Component({
  selector: 'alb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AotYApp';
  filterValue: FilterValue;

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.setTitle(this.title);
  }

  setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  setFilterValue(ev): void {
    this.filterValue = ev;
  }
}
