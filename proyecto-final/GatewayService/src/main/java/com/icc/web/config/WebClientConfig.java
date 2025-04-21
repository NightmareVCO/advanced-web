package com.icc.web.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${gateway.secret}")
    private String gatewaySecret;

    @Bean
    public WebClient authWebClient() {
        return WebClient.builder()
                .baseUrl("http://authservice:8081/api/v1/users")  // Direct connection to auth service
                .defaultHeader("X-Gateway-Secret", gatewaySecret)
                .build();
    }
}