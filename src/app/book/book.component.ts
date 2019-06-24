import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from './book';
import { BookService } from './book.service';

@Component({
    selector:'app-book',
    templateUrl : './book.component.html',
    styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
    book = new Book();
    statusMessage: string;
    books: Book[];
    constructor(private _bookservice: BookService,
        private _router:Router){}
    
    ngOnInit(): void{
        console.log("Calling ngOnInit()::::");
        this.getBooks();
    }

    getBooks(): void{
        console.log("Inside getBooks()::::");
        this._bookservice.getAllBooks()
        .subscribe((bookData) =>{
            this.books = bookData,
            console.log(bookData)
        }, (error) => {
            console.log(error);
            this.statusMessage="Problem with service";
        });
        console.log("End of getBooks()::::");
    }

    addBook(): void{
        this._bookservice.addBook(this.book)
            .subscribe((response) => {console.log(response); this.getBooks();this.reset();},
            (error) =>{
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            }
        );   
    }

    private reset(){
        this.book.id = null;
        this.book.title = null;
        this.book.author = null;
    }

    deleteBook(bookId: string){
        console.log("Inside the deleteBook()::::Book id::::"+bookId);
        this._bookservice.deleteBook(bookId)
            .subscribe((response) => {console.log(response); this.getBooks();},
            (error) =>{
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            });
            this.reset();
            console.log("end of deleteBook():::::::");
    }

    getBook(bookId: string){
        this._bookservice.getBookById(bookId)
            .subscribe((bookData) => {this.books = bookData; this.getBooks(); }),
            (error) => {
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            }
        this.reset();    
    }



}