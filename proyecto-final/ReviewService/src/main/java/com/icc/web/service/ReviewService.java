package com.icc.web.service;

import com.icc.web.dto.ReviewDTO;
import com.icc.web.mapper.ReviewMapper;
import com.icc.web.model.Review;
import com.icc.web.repository.ReviewRepository;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;

    public List<ReviewDTO> getAllReviews() {
        return reviewMapper.reviewsToDtos(reviewRepository.findAll());
    }

    public List<ReviewDTO> getReviewsByBookId(String bookId) {
        return reviewMapper.reviewsToDtos(reviewRepository.findByBookId(bookId));
    }

    public List<ReviewDTO> getReviewsByUserId(String userId) {
        return reviewMapper.reviewsToDtos(reviewRepository.findByUserId(userId));
    }

    public Optional<ReviewDTO> getReviewById(Long id) {
        return reviewRepository.findById(id)
                .map(reviewMapper::reviewToDto);
    }

    public ReviewDTO saveReview(ReviewDTO reviewDTO) {
        Review review = reviewMapper.dtoToReview(reviewDTO);
        review = reviewRepository.save(review);
        return reviewMapper.reviewToDto(review);
    }

    public Optional<ReviewDTO> updateReview(ReviewDTO reviewDTO) {
        if (reviewDTO.getId() == null || !reviewRepository.existsById(reviewDTO.getId())) {
            return Optional.empty();
        }
        Review updatedReview = reviewRepository.save(reviewMapper.dtoToReview(reviewDTO));
        return Optional.of(reviewMapper.reviewToDto(updatedReview));
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