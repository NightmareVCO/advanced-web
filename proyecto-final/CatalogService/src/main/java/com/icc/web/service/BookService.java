package com.icc.web.service;

import com.icc.web.model.Book;
import com.icc.web.repository.BookRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public void addBooks(List<Book> books) {
        bookRepository.saveAll(books);
    }

    public void addBook(Book book) {
        bookRepository.save(book);
    }

    public List<Book> searchBooks(
            String title, String author, List<String> genres, Double minPrice, Double maxPrice) {
        List<Book> books = bookRepository.findAll();

        if (title != null && !title.isBlank()) {
            books =
                    books.stream()
                            .filter(
                                    book ->
                                            book.getTitle()
                                                    .toLowerCase()
                                                    .contains(title.toLowerCase()))
                            .toList();
        }

        if (author != null && !author.isBlank()) {
            books =
                    books.stream()
                            .filter(
                                    book ->
                                            book.getAuthor()
                                                    .toLowerCase()
                                                    .contains(author.toLowerCase()))
                            .toList();
        }

        if (genres != null && !genres.isEmpty()) {
            books =
                    books.stream()
                            .filter(
                                    book ->
                                            book.getGenres().stream()
                                                    .anyMatch(
                                                            genre ->
                                                                    genres.stream()
                                                                            .anyMatch(
                                                                                    genre
                                                                                            ::equalsIgnoreCase)))
                            .toList();
        }

        if (minPrice != null) {
            books = books.stream().filter(book -> book.getPrice() >= minPrice).toList();
        }

        if (maxPrice != null) {
            books = books.stream().filter(book -> book.getPrice() <= maxPrice).toList();
        }

        return books;
    }

    public Book getBookBtId(ObjectId id) {
        return bookRepository.findById(id).orElse(null);
    }
}
