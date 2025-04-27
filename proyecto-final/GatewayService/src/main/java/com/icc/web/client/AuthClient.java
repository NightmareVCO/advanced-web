package com.icc.web.client;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class AuthClient {
    private final WebClient authWebClient;

    public Mono<String> userExistByRole(String userId) {
        return authWebClient.get()
                .uri("/role-by-id/{id}", userId)
                .retrieve()
                .bodyToMono(String.class);
    }
}