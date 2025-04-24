package com.icc.web.dto;

import com.icc.web.model.Book;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class BookSearchResult {
    private int total;
    private int page;
    private int pageSize;
    private List<Book> books;
}