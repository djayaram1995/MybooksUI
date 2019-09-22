import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteService } from '../favorite.service';
import { BOOK } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-favorit-list',
  templateUrl: './favorit-list.component.html',
  styleUrls: ['./favorit-list.component.scss']
})
export class FavoritListComponent implements OnInit {
  private favoriteList: BOOK[]=[];
  constructor(private router: Router,
    private favoriteService: FavoriteService,
    private bookService: BookService) { }

  ngOnInit() {
    this.favoriteService.getAllFavorite().subscribe(data => {
        this.favoriteList = data;
    })
  }
  booKTag(item) {
    this.bookService.setCurrentBook(item);
    this.router.navigate(["bookDetail"]);
  }
  logOut() {
    localStorage.removeItem("accessToken");
    this.router.navigate(["login"]);
  }
}
