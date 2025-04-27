package com.icc.web.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bookId;

    private String bookName;

    private Double bookPrice;

    private String bookCover;

    private String bookAuthor;

    @ElementCollection
    private List<String> bookGenres;

    @Column(columnDefinition = "TEXT")
    private String bookDescription;

    @JoinColumn(name = "order_id", nullable = false)
    @ManyToOne
    private Order order;
}
