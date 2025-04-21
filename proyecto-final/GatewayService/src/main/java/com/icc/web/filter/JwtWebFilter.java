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
    private final PublicRouteValidator routeValidator;
    private final AuthClient authClient; // Use AuthClient instead of WebClient

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getURI().getPath();
        System.out.println("Processing request for path: " + path);

        boolean isPublicRoute = routeValidator.isPublicRoute(request);
        System.out.println("Is public route: " + isPublicRoute);

        if (isPublicRoute) {
            System.out.println("tamo aqui?");
            return chain.filter(exchange);
        }

        Optional<String> optToken = jwtService.getToken(request);
        if (optToken.isEmpty()) {
            System.out.println("token is missing");
            return unauthorized(exchange);
        }

        String token = optToken.get();
        if (token.isBlank()) {
            System.out.println("token is blank");
            return unauthorized(exchange);
        }

        Optional<Claims> optClaims = jwtService.getClaims(token);
        if (optClaims.isEmpty()) {
            System.out.println("Claims are missing");
            return unauthorized(exchange);
        }

        Claims claims = optClaims.get();
        String userId = String.valueOf(claims.get("userId"));
        if (userId == null || userId.isBlank()) {
            System.out.println("User ID is missing or blank");
            return unauthorized(exchange);
        }

        return validateUserExists(userId, exchange, chain);
    }

    private Mono<Void> validateUserExists(
            String userId, ServerWebExchange exchange, WebFilterChain chain) {
        return authClient.userExistByRole(userId)  // Use AuthClient instead of WebClient directly
                .flatMap(role -> {
                    if (role == null || role.trim().isEmpty()) {
                        System.out.println("User role is missing or blank");
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
                    System.out.println("Auth client error: " + e.getMessage());
                    return unauthorized(exchange);
                });    }

    private Mono<Void> unauthorized(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }
}
