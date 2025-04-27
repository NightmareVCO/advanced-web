package com.icc.web.dto;

import java.util.List;
import lombok.Value;

@Value
public class CartItemResponseDTO {
    String id;
    String bookId;
    String bookName;
    String bookCover;
    String bookAuthor;
    List<String> bookGenres;
    String bookDescription;
}
