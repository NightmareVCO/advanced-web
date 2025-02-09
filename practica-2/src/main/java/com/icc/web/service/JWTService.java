package com.icc.web.service;

import com.icc.web.dto.AuthResponseDTO;
import com.icc.web.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class JWTService {
    private final UserService userService;

    @Value("${jwt.expiresIn}")
    private int expiresIn;

    private static final String ISSUER = "MOCKIFY-JWT";

    @Value("${jwt.secret}")
    private String secret;

    public AuthResponseDTO generateToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        User user = userService.getUserByUsername(userName);
        String userId = String.valueOf(user.getId());

        claims.put("username", userName);
        claims.put("roles", String.join(",", user.getRoles().toString()));
        claims.put("userId", userId);

        return createToken(claims, userName, userId);
    }

    private AuthResponseDTO createToken(Map<String, Object> claims, String userName, String id) {
        LocalDateTime localDateTime = LocalDateTime.now().plusMinutes(expiresIn);
        Date expirationDate = Date.from(localDateTime.toInstant(ZoneOffset.ofHours(-4)));

        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

        String jwt = Jwts.builder()
                .id(id)
                .claims(claims)
                .issuer(ISSUER)
                .subject(userName)
                .signWith(key)
                .issuedAt(new Date())
                .expiration(expirationDate)
                .compact();

        return new AuthResponseDTO(jwt);
    }

    // private Boolean isTokenExpired(String token) {
    // return extractExpiration(token).before(new Date());
    // }
    //
    // public Boolean validateToken(String token, UserDetails userDetails) {
    // final String username = extractUsername(token);
    // return (username.equals(userDetails.getUsername()) &&
    // !isTokenExpired(token));
    // }
    //
    // public Boolean validateToken(String token){
    // return !isTokenExpired(token);
    // }

}
