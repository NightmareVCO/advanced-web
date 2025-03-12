/* (C)2025 */
package com.icc.web.controller;

import com.icc.web.dto.AuthResponseDTO;
import com.icc.web.exception.BadRequestException;
import com.icc.web.service.JWTService;
import io.jsonwebtoken.Claims;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/logout/")
public class LogoutController {
    private final JWTService jwtService;

    @PostMapping
    public ResponseEntity<AuthResponseDTO> logout(@RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);

        Optional<Claims> claims = jwtService.getClaims(jwt);
        if (claims.isEmpty()) {
            throw new BadRequestException("Invalid token");
        }

        if (jwtService.isTokenExpired(jwt)) {
            throw new BadRequestException("Token expired");
        }

        jwtService.revokeToken(jwt);

        return ResponseEntity.ok().build();
    }
}
