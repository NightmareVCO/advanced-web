package com.icc.web.service;

import com.icc.web.dto.BookSearchResultDto;
import com.icc.web.model.Book;
import com.icc.web.repository.BookRepository;
import java.util.List;
import java.util.Optional;

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

    public List<Book> getBooksByIds(List<ObjectId> ids) {
        return bookRepository.findAllById(ids);
    }

    public void addBooks(List<Book> books) {
        bookRepository.saveAll(books);
    }

    public void addBook(Book book) {
        bookRepository.save(book);
    }

    public BookSearchResultDto searchBooks(
            String title,
            String author,
            String genreString,
            String sort,
            Double minPrice,
            Double maxPrice,
            Integer page) {
        return bookRepository.searchBooks(title, author, genreString, sort, minPrice, maxPrice, page);
    }

    public Optional<Book> getBookBtId(ObjectId id) {
        return bookRepository.findById(id);
    }
}
