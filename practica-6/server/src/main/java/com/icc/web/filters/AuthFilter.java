/* (C)2025 */
package com.icc.web.filters;

import com.icc.web.model.Endpoint;
import com.icc.web.service.EndpointService;
import com.icc.web.service.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import lombok.AllArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

@AllArgsConstructor
public class AuthFilter extends OncePerRequestFilter {
    private final JWTService jwtService;
    private final EndpointService endpointService;

    private final AntPathMatcher pathMatcher = new AntPathMatcher();
    private static final List<Pattern> SECURED_PATH_PATTERNS =
            List.of(Pattern.compile("/api/v1/endpoint/"), Pattern.compile("/api/v1/projects/"));

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        return SECURED_PATH_PATTERNS.stream()
                .noneMatch(pattern -> pattern.matcher(requestURI).matches());
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String projectId =
                pathMatcher
                        .extractUriTemplateVariables(
                                "/api/v1/endpoint/projects/{projectId}/api/**",
                                request.getRequestURI())
                        .get("projectId");
        String path = request.getRequestURI().replace("/api/v1/endpoint/", "");
        String method = request.getMethod();

        Optional<Endpoint> endpoint = endpointService.getEndpointByPathAndMethod(path, method);
        if (endpoint.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("Endpoint not found");
            response.getWriter().flush();
            return;
        }

        if (!endpoint.get().isSecurity()) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized");
            response.getWriter().flush();
            return;
        }

        String jwt = token.substring(7);
        if (jwtService.isJwtEndpointValid(jwt, projectId, endpoint.get().getId().toString())) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized");
            response.getWriter().flush();
            return;
        }

        filterChain.doFilter(request, response);
    }
}
