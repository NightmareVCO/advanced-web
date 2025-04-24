package com.icc.web.filter;

import java.util.List;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
public class PublicRouteValidator {

    private static final List<String> PUBLIC_PATHS =
            List.of("/api/v1/auth/", "/api/v1/books/", "/api/v1/books/search", "/api/v1/reviews/",
                    "/api/v1/auth/login/", "/api/v1/auth/register/", "/api/v1/email/send-purchase",
                    "/api/v1/email/send-registration");

    public boolean isPublicRoute(ServerHttpRequest request) {
        String path = request.getURI().getPath();
        return PUBLIC_PATHS.stream().anyMatch(path::startsWith);
    }

    public String[] getPublicPatterns() {
        return PUBLIC_PATHS.toArray(new String[0]);
    }

}
