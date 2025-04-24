package com.icc.web.service;

import com.icc.web.dto.ReviewDTO;
import com.icc.web.mapper.ReviewMapper;
import com.icc.web.model.Review;
import com.icc.web.repository.ReviewRepository;

import lombok.AllArgsConstructor;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public List<Review> getReviewsByBookId(String bookId) {
        return reviewRepository.findByBookId(bookId);
    }

    public List<Review> getReviewsByUserId(String userId) {
        return reviewRepository.findByUserId(userId);
    }

    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    public Double getAverageRatingForBook(String bookId) {
        List<Review> reviews = reviewRepository.findByBookId(bookId);
        if (reviews.isEmpty()) {
            return 0.0;
        }
        return reviews.stream()
                .mapToDouble(Review::getRating)
                .average()
                .orElse(0.0);
    }

    public Long countReviewsByBookId(String bookId) {
        return reviewRepository.countByBookId(bookId);
    }

    public void deleteReviewsByBookId(String bookId) {
        reviewRepository.deleteByBookId(bookId);
    }

    public void deleteReviewsByUserId(String userId) {
        reviewRepository.deleteByUserId(userId);
    }
}