package com.icc.web.dto;

import java.time.LocalDateTime;

import lombok.Value;

@Value
public class ReviewResponseDTO {
    private String title;
    private String bookId;
    private String userId;
    private String comment;
    private Double rating;
    private LocalDateTime createdAt;
}
