package com.icc.web.repository;

import com.icc.web.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    // Find reviews by book ID
    List<Review> findByBookId(String bookId);

    // Find reviews by user ID
    List<Review> findByUserId(String userId);

    // Find reviews by rating greater than or equal to specified value
    List<Review> findByRatingGreaterThanEqual(Double rating);

    // Count reviews by book ID
    Long countByBookId(String bookId);

    // Delete reviews by book ID
    void deleteByBookId(String bookId);

    // Delete reviews by user ID
    void deleteByUserId(String userId);
}