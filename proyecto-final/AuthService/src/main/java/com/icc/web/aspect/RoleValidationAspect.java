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
                    + " @annotation(com.icc.web.annotation.RoleValidation)")
    public void adminRouteMethods() {}

    @Before("adminRouteMethods()")
    public void validateAdminRole() {
        String roles = request.getHeader("X-User-Roles");
        if (roles == null) {
            throw new SecurityException("Access denied: No allowed origin");
        }

        boolean isAdminRolePresent = roles.contains("ADMIN");
        if (!isAdminRolePresent) {
            throw new SecurityException("Access denied: User does not have permission");
        }
    }
}
