package com.icc.web.dto;

import java.util.List;
import lombok.Value;

@Value
public class OrderItemResponseDTO {
    String bookId;
    String bookName;
    String bookCover;
    String bookAuthor;
    List<String> bookGenres;
    String bookDescription;
    double bookPrice;
}
