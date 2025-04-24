package com.icc.web.repository.custom;

import com.icc.web.dto.BookSearchResult;

public interface BookRepositoryCustom {
    BookSearchResult searchBooks(
            String title,
            String author,
            String genreString,
            String sort,
            Double minPrice,
            Double maxPrice,
            Integer page);
}
