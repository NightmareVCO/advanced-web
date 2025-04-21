package com.icc.web.filter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class GatewaySecretHeaderFilter implements WebFilter {

    @Value("${gateway.secret}")
    private String gatewaySecret;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();

        ServerHttpRequest mutatedRequest =
                request.mutate().header("X-Gateway-Secret", gatewaySecret).build();

        return chain.filter(exchange.mutate().request(mutatedRequest).build());
    }
}
