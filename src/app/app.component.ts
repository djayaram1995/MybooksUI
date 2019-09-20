import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'bookkeeper';
  bookSearch: String = "";
  bookList: [] = [];
  constructor(private http: HttpClient) {
    
  }
  showBook: boolean = false;
  currentBook: object = {};
  bookGet(e) {
    this.bookSearch = e.target.value;
    console.log(this.bookSearch);
    this.http.get(`https://openlibrary.org/search.json?q=${e.target.value}`).subscribe((data: any) => {
      console.log(data);
      this.bookList=data.docs; 
      this.showBook=false; 
    })
    
  }
  booKTag(olid) {
    console.log(`https://openlibrary.org/api/books?bibkeys=OLID:${olid}&jscmd=data&format=json`);
    this.http.get(`https://openlibrary.org/api/books?bibkeys=OLID:${olid}&jscmd=data&format=json`).subscribe((dataFrom: any) => {
      console.log(dataFrom);
      this.currentBook=dataFrom[`OLID:${olid}`]
      this.showBook=true; 
      this.bookSearch="";
    })
    
  }
  clickBack() {
    this.showBook=false; 
    this.currentBook={}
  }
}