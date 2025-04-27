package com.icc.web.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import lombok.Value;

@Value
public class OderItemDTO {
    @NotBlank() String bookId;
    @NotBlank() String bookName;
    @NotBlank() String bookCover;
    @NotBlank() String bookAuthor;
    @NotEmpty() List<String> bookGenres;
    @NotBlank() String bookDescription;

    @Min(0)
    double bookPrice;
}
