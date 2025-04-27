package com.icc.web.dto;

import lombok.Value;

@Value
public class RatingResponseDTO {
  int oneStar;
  int twoStar;
  int threeStar;
  int fourStar;
  int fiveStar;
  int totalRatings;
  double averageRating;
}
