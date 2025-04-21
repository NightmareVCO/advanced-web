package com.icc.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

// @Configuration
// @EnableWebSecurity
// @RequiredArgsConstructor
// @EnableMethodSecurity(jsr250Enabled = true)
// public class SecurityConfig {

//     private final JwtFilter jwtFilter;
//     private final UserDetailsServiceImpl userDetailsServiceImpl;

//     @Bean
//     public AuthenticationManager authManager(HttpSecurity http) throws Exception {
//         AuthenticationManagerBuilder authManager =
//                 http.getSharedObject(AuthenticationManagerBuilder.class);

//
// authManager.userDetailsService(userDetailsServiceImpl).passwordEncoder(passwordEncoder());

//         return authManager.build();
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         return http.csrf(AbstractHttpConfigurer::disable)
//                 .sessionManagement(
//                         session ->
// session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                 .authorizeHttpRequests(
//                         auth ->
//                                 auth.requestMatchers("/api/v1/auth/login/")
//                                         .permitAll()
//                                         .anyRequest()
//                                         .authenticated())
//                 .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
//                 .build();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }
// }

@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
