package com.icc.web;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Utils {
    private Utils() {
    }

    public static boolean isUserAdmin(UserDetails userDetails) {
        return userDetails.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ADMIN"));
    }

    public static boolean isPasswordCorrect(String encodedPassword, String password) {
        return new BCryptPasswordEncoder().matches(encodedPassword, password);
    }

}
