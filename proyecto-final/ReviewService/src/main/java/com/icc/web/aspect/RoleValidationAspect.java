package com.icc.web.aspect;

import com.icc.web.exception.SecurityException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class RoleValidationAspect {
    private final HttpServletRequest request;

    @Pointcut(
            "execution(* com.icc.web.controller..*(..)) &&"
                    + " @annotation(com.icc.web.annotation.AdminRoute)")
    public void adminRouteMethods() {}

    @Before("adminRouteMethods()")
    public void validateAdminRole() {
        String role = request.getHeader("X-User-Role");
        if (role == null || role.isEmpty()) {
            throw new SecurityException("Access denied: No role header found");
        }

        boolean isAdminRolePresent = role.equals("ADMIN");
        if (!isAdminRolePresent) {
            throw new SecurityException("Access denied: User does not have permission");
        }
    }
}
