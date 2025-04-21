package com.icc.web.filter;

import com.icc.web.client.AuthClient;
import com.icc.web.service.JwtService;
import io.jsonwebtoken.Claims;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class JwtWebFilter implements WebFilter {

    private final JwtService jwtService;
    private final AuthClient authClient;
    private final PublicRouteValidator routeValidator;

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
        return Mono.fromCallable(() -> authClient.userExistsById(userId))
                .flatMap(
                        exists -> {
                            if (!exists.booleanValue()) {
                                return unauthorized(exchange);
                            }

                            UsernamePasswordAuthenticationToken auth =
                                    new UsernamePasswordAuthenticationToken(
                                            userId, null, List.of());
                            SecurityContextImpl context = new SecurityContextImpl(auth);
                            return chain.filter(exchange)
                                    .contextWrite(
                                            ReactiveSecurityContextHolder.withSecurityContext(
                                                    Mono.just(context)));
                        });
    }

    private Mono<Void> unauthorized(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }
}
