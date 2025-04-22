package com.icc.web.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${gateway.secret}")
    private String gatewaySecret;

    @Bean
    @LoadBalanced
    public WebClient.Builder loadBalancedWebClientBuilder() {
        return WebClient.builder();
    }

    @Bean
    public WebClient authWebClient(WebClient.Builder builder) {
        return builder
                .baseUrl("http://AUTHSERVICE/api/v1/users")
                .defaultHeader("X-Gateway-Secret", gatewaySecret)
                .build();
    }
}