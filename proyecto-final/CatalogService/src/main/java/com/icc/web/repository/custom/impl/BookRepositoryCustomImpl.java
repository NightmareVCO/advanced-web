package com.icc.web.repository.custom.impl;

import com.icc.web.dto.BookSearchResultDto;
import com.icc.web.model.Book;
import com.icc.web.repository.custom.BookRepositoryCustom;
import java.util.*;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Collation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class BookRepositoryCustomImpl implements BookRepositoryCustom {
    private final MongoTemplate mongoTemplate;

    private static final int PAGE_SIZE = 16;

    @Override
    public BookSearchResultDto searchBooks(
            String title,
            String author,
            String genreString,
            String sort,
            Double minPrice,
            Double maxPrice,
            Integer page) {

        List<Criteria> filters = new ArrayList<>();

        if (title != null && !title.isBlank()) {
            filters.add(Criteria.where("title").regex(".*" + Pattern.quote(title) + ".*", "i"));
        }

        if (author != null && !author.isBlank()) {
            filters.add(Criteria.where("author").regex(".*" + Pattern.quote(author) + ".*", "i"));
        }

        if (genreString != null && !genreString.isBlank()) {
            List<String> genres =
                    Arrays.stream(genreString.split(","))
                            .map(String::trim)
                            .filter(s -> !s.isEmpty())
                            .toList();

            for (String g : genres) {
                filters.add(Criteria.where("genres").regex("^" + Pattern.quote(g) + "$", "i"));
            }
        }

        if (minPrice != null) {
            filters.add(Criteria.where("price").gte(minPrice));
        }

        if (maxPrice != null) {
            filters.add(Criteria.where("price").lte(maxPrice));
        }

        Criteria criteria = new Criteria();
        if (!filters.isEmpty()) {
            criteria.andOperator(filters.toArray(new Criteria[0]));
        }


        Query query = new Query(criteria);

        Sort sortObj = mapSortKeyToSort(sort);
        query.with(sortObj);
        query.collation(Collation.of("en").strength(Collation.ComparisonLevel.secondary()));

        int currentPage = (page == null || page < 1) ? 1 : page;
        query.skip((currentPage - 1L) * PAGE_SIZE).limit(PAGE_SIZE);

        long total = mongoTemplate.count(new Query(criteria), Book.class);

        List<Book> results = mongoTemplate.find(query, Book.class);

        return BookSearchResultDto.builder()
                .books(results)
                .total((int) total)
                .page(currentPage)
                .pageSize(PAGE_SIZE)
                .build();
    }

    private Sort mapSortKeyToSort(String sortKey) {
        if (sortKey == null || sortKey.isBlank()) {
            sortKey = "title_a_to_z";
        }

        return switch (sortKey) {
            case "title_z_to_a" -> Sort.by(Sort.Direction.DESC, "title");
            case "price_low_to_high" -> Sort.by(Sort.Direction.ASC, "price");
            case "price_high_to_low" -> Sort.by(Sort.Direction.DESC, "price");
            case "author_a_to_z" -> Sort.by(Sort.Direction.ASC, "author");
            case "author_z_to_a" -> Sort.by(Sort.Direction.DESC, "author");
            default -> Sort.by(Sort.Direction.ASC, "title"); // title_a_to_z
        };
    }
}
