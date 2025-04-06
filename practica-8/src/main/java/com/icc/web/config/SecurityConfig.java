package com.icc.web.config;

import com.icc.web.services.UserDetailsServiceImplementation;
import com.icc.web.views.LoginView;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.vaadin.flow.spring.security.VaadinWebSecurity;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig extends VaadinWebSecurity {

    @Bean
    public AuthenticationManager authManager(HttpSecurity http, UserDetailsServiceImplementation userDetailsServiceImplementation) throws Exception {
        AuthenticationManagerBuilder authManager = http.getSharedObject(AuthenticationManagerBuilder.class);

        authManager
                .userDetailsService(userDetailsServiceImplementation)
                .passwordEncoder(passwordEncoder());

        return authManager.build();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        super.configure(http);
        setLoginView(http, LoginView.class);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}