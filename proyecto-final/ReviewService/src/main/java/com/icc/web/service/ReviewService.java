package com.icc.web.service;

import com.icc.web.dto.RatingResponseDTO;
import com.icc.web.model.Review;
import com.icc.web.repository.ReviewRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public RatingResponseDTO getRatingForBook(String bookId) {
    List<Review> reviews = getReviewsByBookId(bookId);
    int oneStar = 0;
    int twoStar = 0;
    int threeStar = 0;
    int fourStar = 0;
    int fiveStar = 0;
    int sum = 0;

    for (Review review : reviews) {
        int rating = review.getRating();
        sum += rating;
        switch (rating) {
            case 1:
                oneStar++;
                break;
            case 2:
                twoStar++;
                break;
            case 3:
                threeStar++;
                break;
            case 4:
                fourStar++;
                break;
            case 5:
                fiveStar++;
                break;
            default:
                break;
        }
    }
    int totalRatings = reviews.size();
    double averageRating = totalRatings > 0 ? sum / totalRatings : 0;

    return new RatingResponseDTO(oneStar, twoStar, threeStar, fourStar, fiveStar, totalRatings, averageRating);
}

    public Double getAverageRatingForBook(String bookId) {
        List<Review> reviews = reviewRepository.findByBookId(bookId);
        if (reviews.isEmpty()) {
            return 0.0;
        }
        return reviews.stream().mapToDouble(Review::getRating).average().orElse(0.0);
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
