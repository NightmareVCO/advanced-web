package com.icc.web.filter;

import com.icc.web.client.AuthClient;
import com.icc.web.service.JwtService;
import io.jsonwebtoken.Claims;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtWebFilter implements WebFilter {

    private final JwtService jwtService;
    private final PublicRouteValidator routeValidator;
    private final AuthClient authClient; // Use AuthClient instead of WebClient

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        boolean isPublicRoute = routeValidator.isPublicRoute(request);

        if (isPublicRoute) {
            return chain.filter(exchange);
        }

        Optional<String> optToken = jwtService.getToken(request);
        if (optToken.isEmpty()) {
            return unauthorized(exchange);
        }

        String token = optToken.get();
        if (token.isBlank()) {
            return unauthorized(exchange);
        }

        Optional<Claims> optClaims = jwtService.getClaims(token);
        if (optClaims.isEmpty()) {
            return unauthorized(exchange);
        }

        Claims claims = optClaims.get();
        String userId = String.valueOf(claims.get("userId"));
        if (userId == null || userId.isBlank()) {
            return unauthorized(exchange);
        }

        return validateUserExists(userId, exchange, chain);
    }

    private Mono<Void> validateUserExists(
            String userId, ServerWebExchange exchange, WebFilterChain chain) {
        return authClient.userExistByRole(userId)  // Use AuthClient instead of WebClient directly
                .flatMap(role -> {
                    if (role == null || role.trim().isEmpty()) {
                        return unauthorized(exchange);
                    }

                    ServerHttpRequest modifiedRequest = exchange.getRequest()
                            .mutate()
                            .headers(headers -> {
                                headers.add("X-User-Role", role);
                                headers.add("X-User-Id", userId);
                            })
                            .build();

                    ServerWebExchange modifiedExchange = exchange.mutate()
                            .request(modifiedRequest)
                            .build();

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                    userId, null, List.of());
                    SecurityContextImpl context = new SecurityContextImpl(auth);

                    return chain.filter(modifiedExchange)
                            .contextWrite(
                                    ReactiveSecurityContextHolder.withSecurityContext(
                                            Mono.just(context)));
                })
                .onErrorResume(e -> {
                    log.error("Error validating user existence", e);
                    return unauthorized(exchange);
                });    }

    private Mono<Void> unauthorized(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }
}
