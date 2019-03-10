import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, Sort} from '@angular/material';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})

export class TweetsComponent implements OnInit {  
  dataSource;
  sortedData;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  ELEMENT_DATA = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  @ViewChild(MatSort) sort: MatSort;

  constructor() { 
    this.sortedData = this.ELEMENT_DATA.slice();

  }
  ngOnInit() {
    this.createTable();
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
        case 'position': return compare(a.position, b.position, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'weight': return compare(a.weight, b.weight, isAsc);
        case 'symbol': return compare(a.symbol, b.symbol, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
