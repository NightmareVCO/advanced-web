package com.icc.web.mapper;

import com.icc.web.dto.ReviewDTO;
import com.icc.web.model.Review;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ReviewMapper {
    ReviewMapper INSTANCE = Mappers.getMapper(ReviewMapper.class);

    ReviewDTO reviewToDto(Review review);

    Review dtoToReview(ReviewDTO reviewDTO);

    List<ReviewDTO> reviewsToDtos(List<Review> reviews);

    List<Review> dtosToReviews(List<ReviewDTO> reviewDTOs);
}