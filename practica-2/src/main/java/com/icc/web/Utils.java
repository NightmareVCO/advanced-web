package com.icc.web;

import org.springframework.security.core.userdetails.UserDetails;

public class Utils {
    public static boolean isUserAdmin(UserDetails userDetails) {
        return userDetails.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ADMIN"));
    }
}
