package com.icc.web.util;

import com.icc.web.model.Book;
import com.icc.web.service.BookService;
import com.icc.web.service.FakerService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class BookGenerator implements ApplicationRunner {

    @Value("${catalog-service.should-generate-books}")
    private boolean shouldGenerateBooks;

    @Value("${catalog-service.amount-of-books-to-generate}")
    private int amountOfBookToGenerate;

    private final BookService bookService;
    private final FakerService fakerService;

    @Override
    public void run(ApplicationArguments arguments) throws Exception {
        if (!shouldGenerateBooks) {
            log.info("Book generation is disabled.");
            return;
        }

        log.info("Generating {} books...", amountOfBookToGenerate);
        List<Book> books = fakerService.generateBooks(amountOfBookToGenerate);
        bookService.addBooks(books);
        log.info("Books generated and saved to the database.");
    }
}
