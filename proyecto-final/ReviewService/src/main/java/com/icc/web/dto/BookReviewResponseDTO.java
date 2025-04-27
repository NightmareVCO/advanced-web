package com.icc.web.dto;

import java.util.List;

import lombok.Value;

@Value
public class BookReviewResponseDTO {
  String bookId;
  List<ReviewResponseDTO> reviews;
  RatingResponseDTO rating;
}
