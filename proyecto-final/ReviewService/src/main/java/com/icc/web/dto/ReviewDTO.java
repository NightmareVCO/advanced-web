package com.icc.web.dto;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class ReviewDTO {
    @NotBlank(message = "Title is mandatory")
    private String title;

    @NotBlank(message = "Book ID is mandatory")
    private String bookId;

    @NotBlank(message = "User ID is mandatory")
    private String userId;

    private String comment;

    @NotNull(message = "Rating is mandatory")
    @Min(value = 0, message = "Rating must be between 0 and 5")
    @Max(value = 5, message = "Rating must be between 0 and 5")
    private int rating;
}
