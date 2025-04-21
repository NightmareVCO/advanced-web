package com.icc.web.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.WeakKeyException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.*;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtService {
    private static final Charset ENCODING = StandardCharsets.UTF_8;
    private static final int BEARER_PREFIX_LENGTH = 7;

    @Value("${security.jwt.secret-key}")
    private String secretKey;

    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;

    public Optional<String> getToken(ServerHttpRequest request) {
        HttpHeaders headers = request.getHeaders();
        String authHeader = headers.getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return Optional.empty();
        }

        String token = authHeader.substring(BEARER_PREFIX_LENGTH);
        if (token.isBlank()) {
            return Optional.empty();
        }

        return Optional.of(token);
    }

    public Optional<Claims> getClaims(String token) {
        try {
            JwtParser parser = Jwts.parser().verifyWith(getSigningKey()).build();

            Jws<Claims> signedClaims = parser.parseSignedClaims(token);
            if (signedClaims == null) {
                return Optional.empty();
            }

            Claims claims = signedClaims.getPayload();
            if (claims == null) {
                return Optional.empty();
            }

            return Optional.of(claims);

        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public boolean isTokenValid(String token) {
        Optional<Claims> optionalClaims = getClaims(token);
        if (optionalClaims.isEmpty()) {
            return false;
        }

        Claims claims = optionalClaims.get();

        return isTokenExpired(claims);
    }

    public String extractUsername(String token) {
        Optional<Claims> optClaims = getClaims(token);
        if (optClaims.isEmpty()) {
            return null;
        }

        Claims claims = optClaims.get();
        String subject = claims.getSubject();
        if (subject == null || subject.isBlank()) {
            return null;
        }

        return subject;
    }

    private boolean isTokenExpired(Claims claims) {
        Date now = new Date();
        Date claimsExpirationDate = claims.getExpiration();
        if (claimsExpirationDate == null) {
            return true;
        }

        return claimsExpirationDate.before(now);
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = secretKey.getBytes(ENCODING);
        try {
            SecretKey key = Keys.hmacShaKeyFor(keyBytes);
            if (key == null) {
                throw new IllegalArgumentException("Invalid key size");
            }

            return key;
        } catch (WeakKeyException e) {
            throw new IllegalArgumentException("Invalid key size", e);
        }
    }
}
