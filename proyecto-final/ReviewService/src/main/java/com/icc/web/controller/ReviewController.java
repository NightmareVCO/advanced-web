package com.icc.web.controller;

import com.icc.web.annotation.GatewayValidation;
import com.icc.web.dto.ReviewDTO;
import com.icc.web.exception.InternalServerError;
import com.icc.web.exception.ResourceNotFoundException;
import com.icc.web.service.ReviewService;
import jakarta.validation.Valid;
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
    public ResponseEntity<List<ReviewDTO>> getAllReviews() {
        List<ReviewDTO> reviews = reviewService.getAllReviews();
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable Long id) {
        Optional<ReviewDTO> review = reviewService.getReviewById(id);
        if (review.isEmpty()) {
            throw new ResourceNotFoundException("Review not found");
        }
        return new ResponseEntity<>(review.get(), HttpStatus.OK);
    }

    @GetMapping("book/{bookId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByBookId(@PathVariable String bookId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByBookId(bookId);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @GetMapping("user/{userId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByUserId(@PathVariable String userId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByUserId(userId);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
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
    public ResponseEntity<ReviewDTO> createReview(@Valid @RequestBody ReviewDTO reviewDTO) {
        ReviewDTO createdReview = reviewService.saveReview(reviewDTO);
        return new ResponseEntity<>(createdReview, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        Optional<ReviewDTO> review = reviewService.getReviewById(id);
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