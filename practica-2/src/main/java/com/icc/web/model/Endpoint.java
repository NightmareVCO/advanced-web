package com.icc.web.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Endpoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String path;
    private String method;
    private boolean status;
    private String delay;
    private boolean security;
    private LocalDateTime expirationDate;
    private String encoding;
    private String responseType;
    private String responseStatus;
    private String JWT;
    private String body;

    @ManyToOne
    private Project project;

    @OneToMany(mappedBy = "endpoint", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Header> headers;
}