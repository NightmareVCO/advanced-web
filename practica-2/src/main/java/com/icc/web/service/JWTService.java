package com.icc.web.service;

import com.icc.web.dto.AuthResponseDTO;
import com.icc.web.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;

import javax.crypto.SecretKey;
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
    SecretKey key = Jwts.SIG.HS256.key().build();

    public AuthResponseDTO generateToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        User user = userService.getUserByUsername(userName);
        String userId = String.valueOf(user.getId());
        claims.put("roles", String.join(",", user.getRoles().toString()));
        return createToken(claims, userName, userId);
    }

    private AuthResponseDTO createToken(Map<String, Object> claims, String userName, String id) {
        LocalDateTime localDateTime = LocalDateTime.now().plusMinutes(expiresIn);
        Date expirationDate = Date.from(localDateTime.toInstant(ZoneOffset.ofHours(-4)));

        String jwt =  Jwts.builder()
                .issuer(ISSUER)
                .issuedAt(new Date())
                .subject(userName)
                .expiration(expirationDate)
                .id(id)
                .claims(claims)
                .signWith(key).compact();

        return new AuthResponseDTO(jwt, "ADMIN",  expirationDate.getTime());
    }

//    private Boolean isTokenExpired(String token) {
//        return extractExpiration(token).before(new Date());
//    }
//
//    public Boolean validateToken(String token, UserDetails userDetails) {
//        final String username = extractUsername(token);
//        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
//    }
//
//    public Boolean validateToken(String token){
//        return !isTokenExpired(token);
//    }

}
