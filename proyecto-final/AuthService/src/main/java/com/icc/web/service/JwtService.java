package com.icc.web.service;

import com.icc.web.dto.AuthResponseDTO;
import com.icc.web.model.UserInfo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.*;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class JwtService {

    private final UserInfoService userService;

    @Value("${security.jwt.secret-key}")
    private String secretKey;

    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;

    private static final String ISSUER = "BOOKHIVE-JWT";

    public AuthResponseDTO generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        Optional<UserInfo> user = userService.getUserByUsername(username);
        if (user.isEmpty()) {
            return null;
        }

        String userId = String.valueOf(user.get().getId());
        claims.put("username", username);
        claims.put("roles", String.join(",", user.get().getRole()));
        claims.put("userId", userId);

        return createToken(claims, username, userId);
    }

    private AuthResponseDTO createToken(Map<String, Object> claims, String username, String id) {
        LocalDateTime localDateTime = LocalDateTime.now().plusMinutes(jwtExpiration);
        Date expirationDate = Date.from(localDateTime.toInstant(ZoneOffset.ofHours(-4)));

        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        String jwt =
                Jwts.builder()
                        .id(id)
                        .claims(claims)
                        .issuer(ISSUER)
                        .subject(username)
                        .signWith(key)
                        .issuedAt(new Date())
                        .expiration(expirationDate)
                        .compact();

        return new AuthResponseDTO(jwt);
    }

    public Optional<Claims> getClaims(String token) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        try {
            return Optional.ofNullable(
                    Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token) {
        Optional<Claims> claims = this.getClaims(token);
        if (claims.isEmpty()) {
            return true;
        }

        Date expirationDate = claims.get().getExpiration();
        return expirationDate.before(new Date());
    }

    public String extractUsername(String token) {
        return getClaims(token).map(Claims::getSubject).orElse(null);
    }

    public String getToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
}
