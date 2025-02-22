package com.icc.web.service;

import com.icc.web.dto.AuthResponseDTO;
import com.icc.web.model.Endpoint;
import com.icc.web.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
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
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class JWTService {
    private final UserService userService;
    private final EndpointService endpointService;

    @Value("${jwt.expiresIn}")
    private int expiresIn;

    private static final String ISSUER = "MOCKIFY-JWT";

    @Value("${jwt.secret}")
    private String secret;

    public AuthResponseDTO generateToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        Optional<User> user = userService.getUserByUsername(userName);
        if (user.isEmpty()) {
            return null;
        }

        String userId = String.valueOf(user.get().getId());

        claims.put("username", userName);
        claims.put("roles", String.join(",", user.get().getRoles().toString()));
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

    public AuthResponseDTO createTokenForEndpoint(String projectId, String endpointId, LocalDateTime expirationDate) {
        Date expiration = Date.from(expirationDate.toInstant(ZoneOffset.ofHours(-4)));

        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

        String jwt = Jwts.builder()
                .claim("projectId", projectId)
                .claim("endpointId", endpointId)
                .issuer(ISSUER)
                .signWith(key)
                .issuedAt(new Date())
                .expiration(
                        expiration)
                .compact();

        return new AuthResponseDTO(jwt);
    }

    public Optional<Claims> getClaims(String jwt) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        try {
            return Optional.ofNullable(Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt).getPayload());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Claims> getClaimsOfEndpoint(String jwt, String endpointId, String projectId) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        try {
            return Optional.ofNullable(Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt).getPayload());
        } catch (ExpiredJwtException e) {
            // Even if token is expired, we can get claims from the exception
            Claims expiredClaims = e.getClaims();

            // Validate if the expired token was for this endpoint
            String payloadProjectId = expiredClaims.get("projectId", String.class);
            String payloadEndpointId = expiredClaims.get("endpointId", String.class);

            if (!(projectId.equals(payloadProjectId) && endpointId.equals(payloadEndpointId)))
                return Optional.empty();

            Optional<Endpoint> endpoint = endpointService.getEndpointById(Long.parseLong(endpointId));
            if (endpoint.isEmpty()) {
                return Optional.empty();
            }

            endpoint.get().setStatus(false);
            endpointService.saveEndpoint(endpoint.get());

            return Optional.of(expiredClaims);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public boolean isJwtEndpointValid(String jwt, String projectId, String endpointId) {
        try {
            Optional<Claims> payload = this.getClaimsOfEndpoint(jwt, endpointId, projectId);
            if (payload.isEmpty()) {
                return false;
            }

            String payloadProjectId = payload.get().get("projectId", String.class);
            String payloadEndpointId = payload.get().get("endpointId", String.class);

            if (!projectId.equals(payloadProjectId) || !endpointId.equals(payloadEndpointId)) {
                return false;
            }

        } catch (Exception e) {
            return false;
        }

        return true;
    }

    public boolean isTokenExpired(String jwt) {
        Optional<Claims> claims = this.getClaims(jwt);
        if (claims.isEmpty()) {
            return true;
        }

        Date expirationDate = claims.get().getExpiration();
        return expirationDate.before(new Date());
    }
}
