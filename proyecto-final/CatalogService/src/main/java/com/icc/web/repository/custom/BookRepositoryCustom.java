package com.icc.web.repository.custom;

import com.icc.web.dto.BookSearchResultDto;

public interface BookRepositoryCustom {
    BookSearchResultDto searchBooks(
            String title,
            String author,
            String genreString,
            String sort,
            Double minPrice,
            Double maxPrice,
            Integer page);
}
