package com.icc.web.mapper;

import com.icc.web.dto.ReviewDTO;
import com.icc.web.dto.ReviewResponseDTO;
import com.icc.web.model.Review;
import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ReviewMapper {
    ReviewMapper INSTANCE = Mappers.getMapper(ReviewMapper.class);

    ReviewDTO reviewToDto(Review review);

    Review dtoToReview(ReviewDTO reviewDTO);

    List<ReviewDTO> reviewsToDtos(List<Review> reviews);

    List<Review> dtosToReviews(List<ReviewDTO> reviewDTOs);

    List<ReviewResponseDTO> reviewsToResponseDtos(List<Review> reviews);

    ReviewResponseDTO reviewToResponseDto(Review review);

    Review responseDtoToReview(ReviewResponseDTO reviewResponseDTO);
}
