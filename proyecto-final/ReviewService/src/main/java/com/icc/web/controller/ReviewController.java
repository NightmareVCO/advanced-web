package com.icc.web.controller;

import com.icc.web.annotation.GatewayValidation;
import com.icc.web.dto.BookReviewResponseDTO;
import com.icc.web.dto.RatingResponseDTO;
import com.icc.web.dto.ReviewDTO;
import com.icc.web.dto.ReviewResponseDTO;
import com.icc.web.exception.InternalServerError;
import com.icc.web.exception.ResourceNotFoundException;
import com.icc.web.mapper.ReviewMapper;
import com.icc.web.model.Review;
import com.icc.web.service.ReviewService;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@GatewayValidation
@RequiredArgsConstructor
@RequestMapping("/api/v1/reviews/")
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<ReviewResponseDTO>> getAllReviews() {
        List<Review> reviews = reviewService.getAllReviews();

        List<ReviewResponseDTO> reviewResponseDTOs = ReviewMapper.INSTANCE.reviewsToResponseDtos(reviews);

        return new ResponseEntity<>(reviewResponseDTOs, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<ReviewResponseDTO> getReviewById(@PathVariable Long id) {
        Optional<Review> optReview = reviewService.getReviewById(id);
        if (optReview.isEmpty()) {
            throw new ResourceNotFoundException("Review not found");
        }

        Review review = optReview.get();
        ReviewResponseDTO reviewResponseDTO = ReviewMapper.INSTANCE.reviewToResponseDto(review);

        return new ResponseEntity<>(reviewResponseDTO, HttpStatus.OK);
    }

    // @GetMapping("book/{bookId}")
    // public ResponseEntity<List<ReviewResponseDTO>> getReviewsByBookId(@PathVariable String bookId) {
    //     List<Review> reviews = reviewService.getReviewsByBookId(bookId);
    //     List<ReviewResponseDTO> reviewResponseDTOs = ReviewMapper.INSTANCE.reviewsToResponseDtos(reviews);

    //     return new ResponseEntity<>(reviewResponseDTOs, HttpStatus.OK);
    // }

    @GetMapping("book/{bookId}")
        public ResponseEntity<BookReviewResponseDTO> getBookReview(@PathVariable String bookId) {
        List<Review> reviews = reviewService.getReviewsByBookId(bookId);
        List<ReviewResponseDTO> reviewResponseDTOs = ReviewMapper.INSTANCE.reviewsToResponseDtos(reviews);

        RatingResponseDTO ratingResponseDTO = reviewService.getRatingForBook(bookId);

        BookReviewResponseDTO response = new BookReviewResponseDTO(bookId, reviewResponseDTOs, ratingResponseDTO);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("user/{userId}")
    public ResponseEntity<List<ReviewResponseDTO>> getReviewsByUserId(@PathVariable String userId) {
        List<Review> reviews = reviewService.getReviewsByUserId(userId);
        List<ReviewResponseDTO> reviewResponseDTOs = ReviewMapper.INSTANCE.reviewsToResponseDtos(reviews);

        return new ResponseEntity<>(reviewResponseDTOs, HttpStatus.OK);
    }

    @GetMapping("book/{bookId}/average")
    public ResponseEntity<Double> getAverageRatingForBook(@PathVariable String bookId) {
        Double averageRating = reviewService.getAverageRatingForBook(bookId);

        return new ResponseEntity<>(averageRating, HttpStatus.OK);
    }

    @GetMapping("book/{bookId}/count")
    public ResponseEntity<Long> countReviewsByBookId(@PathVariable String bookId) {
        Long count = reviewService.countReviewsByBookId(bookId);

        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ReviewResponseDTO> createReview(@RequestBody ReviewDTO reviewDTO) {
        Review review = ReviewMapper.INSTANCE.dtoToReview(reviewDTO);

        Review createdReview = reviewService.saveReview(review);
        if (createdReview == null) {
            throw new InternalServerError("Failed to create review");
        }

        ReviewResponseDTO reviewResponseDTO = ReviewMapper.INSTANCE.reviewToResponseDto(createdReview);

        return new ResponseEntity<>(reviewResponseDTO, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        Optional<Review> review = reviewService.getReviewById(id);
        if (review.isEmpty()) {
            throw new ResourceNotFoundException("Review not found");
        }

        reviewService.deleteReview(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("book/{bookId}")
    public ResponseEntity<Void> deleteReviewsByBookId(@PathVariable String bookId) {
        reviewService.deleteReviewsByBookId(bookId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("user/{userId}")
    public ResponseEntity<Void> deleteReviewsByUserId(@PathVariable String userId) {
        reviewService.deleteReviewsByUserId(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
