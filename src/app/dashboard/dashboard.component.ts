import { Component, OnInit } from "@angular/core";
import { BookService } from "../book.service";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { BOOK } from '../book';

@Component({
  selector: "app-root",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  title = "bookkeeper";
  bookSearch: string = "";
  bookList: BOOK[] = [];
  showResult:boolean = false;
  constructor(
    private router: Router,
    private bookService: BookService,
    private userService: UserService
  ) {}
  currentBook: object = {};
  user: string = this.userService.userId;
  ngOnInit() {
    if (!localStorage.getItem("accessToken")) {
      this.router.navigate(["login"]);
    }
    this.showResult = false;
    this.bookList = this.bookService.getBookList();
    
  }
  gotoFav() {
    this.router.navigate(["favoriteList"]);
  }
  bookGet() {
    console.log(this.bookSearch);
    this.bookService.getBooks(this.bookSearch).subscribe((data: any) => {
      this.bookList = data.docs;
      this.showResult = true;
      this.bookService.setBookList(this.bookList);
    });
  }
  booKTag(olid) {
    this.bookService.getBook(olid).subscribe((dataFrom: any) => {
      this.bookService.setCurrentBook(dataFrom);
      this.bookSearch = "";
      this.router.navigate(["bookDetail"]);
    });
  }
  logOut() {
    localStorage.removeItem("accessToken");
    this.router.navigate(["login"]);
  }
}
