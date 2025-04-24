package com.icc.web.controller;

import com.icc.web.annotation.GatewayValidation;
import com.icc.web.dto.BookSearchResult;
import com.icc.web.exception.ResourceNotFoundException;
import com.icc.web.model.Book;
import com.icc.web.service.BookService;
import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;

import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@GatewayValidation
@RequestMapping("/api/v1/books/")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping()
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Book> getBook(@PathVariable ObjectId id) {
        Optional<Book> optBook = bookService.getBookBtId(id);
        if (optBook.isEmpty()) {
            throw new ResourceNotFoundException("Book not found with id: " + id);
        }

        Book book = optBook.get();

        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @GetMapping("search")
    public ResponseEntity<BookSearchResult> searchBooks(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false, defaultValue = "1") Integer page) {
        BookSearchResult booksResult = bookService.searchBooks(title, author, genre, sort, minPrice, maxPrice, page);
        return new ResponseEntity<>(booksResult, HttpStatus.OK);
    }
}
