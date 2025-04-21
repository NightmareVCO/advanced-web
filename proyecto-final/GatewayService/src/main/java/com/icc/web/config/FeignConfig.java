package com.icc.web.config;

import feign.RequestInterceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig {

    @Value("${gateway.secret}")
    private String gatewaySecret;

    @Bean
    public RequestInterceptor requestInterceptor() {
        return template -> template.header("X-Gateway-Secret", gatewaySecret);
    }
}
