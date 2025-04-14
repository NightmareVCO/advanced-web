package com.icc.web.config;

import com.icc.web.services.UserDetailsServiceImpl;
import com.icc.web.views.LoginView;
import com.vaadin.flow.spring.security.VaadinWebSecurity;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig extends VaadinWebSecurity {

    @Bean
    public AuthenticationManager authManager(
            HttpSecurity http, UserDetailsServiceImpl userDetailsServiceImplementation)
            throws Exception {
        AuthenticationManagerBuilder authManager =
                http.getSharedObject(AuthenticationManagerBuilder.class);

        authManager
                .userDetailsService(userDetailsServiceImplementation)
                .passwordEncoder(passwordEncoder());

        return authManager.build();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(
                auth ->
                        auth.requestMatchers("/")
                                .permitAll()
                                .requestMatchers("/static/**")
                                .permitAll()
                                .requestMatchers("/images/**")
                                .permitAll());

        super.configure(http);
        setLoginView(http, LoginView.class);
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
