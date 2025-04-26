package com.icc.web.service;

import com.icc.web.dto.AuthResponseDTO;
import com.icc.web.model.UserInfo;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.*;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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

        
        String roles = String.join(",", user.get().getRole());
        String email = user.get().getEmail();

        claims.put("username", username);
        claims.put("roles", roles);
        claims.put("email", email);
        claims.put("userId", userId);

        return createToken(claims, username, userId);
    }

    private AuthResponseDTO createToken(Map<String, Object> claims, String username, String id) {
        LocalDateTime localDateTime = LocalDateTime.now().plusMinutes(jwtExpiration);
        Date expirationDate = Date.from(localDateTime.toInstant(ZoneOffset.ofHours(-4)));

        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        Date issuedAt = new Date();

        String jwt =
                Jwts.builder()
                        .id(id)
                        .claims(claims)
                        .issuer(ISSUER)
                        .subject(username)
                        .signWith(key)
                        .issuedAt(issuedAt)
                        .expiration(expirationDate)
                        .compact();

        return new AuthResponseDTO(jwt);
    }
}
