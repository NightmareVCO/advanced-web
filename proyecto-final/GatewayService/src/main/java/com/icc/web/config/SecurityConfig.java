package com.icc.web.config;

import com.icc.web.filter.GatewaySecretHeaderFilter;
import com.icc.web.filter.JwtWebFilter;
import com.icc.web.filter.PublicRouteValidator;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtWebFilter jwtWebFilter;
    private final GatewaySecretHeaderFilter gatewaySecretHeaderFilter;
    private final PublicRouteValidator publicRouteValidator;

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        return http.csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(
                        exchanges ->
                                exchanges
                                        .pathMatchers(
                                                publicRouteValidator.getPublicPatterns())
                                        .permitAll()
                                        .anyExchange()
                                        .authenticated())
                .addFilterBefore(gatewaySecretHeaderFilter, SecurityWebFiltersOrder.FIRST)
                .addFilterAfter(jwtWebFilter, SecurityWebFiltersOrder.AUTHENTICATION)
                .build();
    }
}
