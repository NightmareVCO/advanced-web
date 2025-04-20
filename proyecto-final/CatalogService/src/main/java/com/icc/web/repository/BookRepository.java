package com.icc.web.repository;

import com.icc.web.model.Book;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends MongoRepository<Book, ObjectId> {
    List<Book> findByTitleContainingIgnoreCase(String title);

    List<Book> findByAuthorContainingIgnoreCase(String author);

    List<Book> findByGenresIn(List<String> genres);

    List<Book> findByPriceBetween(Double minPrice, Double maxPrice);
}
