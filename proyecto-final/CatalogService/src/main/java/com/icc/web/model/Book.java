package com.icc.web.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.icc.web.util.ObjectIdDeserializer;
import com.icc.web.util.ObjectIdSerializer;
import java.time.LocalDateTime;
import java.util.List;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document(collection = "books")
@CompoundIndex(name = "author_genre_price_idx", def = "{'author': 1, 'genres': 1, 'price': 1}")
public class Book {
    @Id
    @JsonDeserialize(using = ObjectIdDeserializer.class)
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;

    @Indexed
    private String title;
    private String description;

    @Indexed
    private String author;

    @Indexed
    private List<String> genres;

    @Indexed
    private double price;
    private String cover;
    private LocalDateTime createdAt;
}
