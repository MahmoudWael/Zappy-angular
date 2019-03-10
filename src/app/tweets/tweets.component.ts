import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, Sort} from '@angular/material';
import {TweetService } from './tweets.service';
import { ITweets } from './tweets';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})

export class TweetsComponent implements OnInit {  
  dataSource;
  sortedData;
  ELEMENT_DATA: ITweets[];
  errorMessage: string;
  displayedColumns: string[] = ['text', 'created_at'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private tweetService: TweetService) { 
  }
  ngOnInit() {
    this.tweetService.getTweets().subscribe(
      tweets => {
        this.ELEMENT_DATA = tweets;
        this.sortedData = this.ELEMENT_DATA.slice();
        this.createTable();
      },
      error => this.errorMessage = <any>error
    );
  }

  createTable() {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.sort = this.sort;
  }

  sortData(sort: Sort) {
    const data = this.ELEMENT_DATA.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'created_at': return compare(a.created_at, b.created_at, isAsc);
        case 'text': return compare(a.text, b.text, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
