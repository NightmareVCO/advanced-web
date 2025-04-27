package com.icc.web.aspect;

import com.icc.web.exception.UnauthorizedException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class UserValidationAspect {
    private final HttpServletRequest request;

    @Pointcut(
            "@within(com.icc.web.annotation.UserValidation) ||"
                    + " @annotation(com.icc.web.annotation.UserValidation)")
    public void userValidationPoints() {}

    @Before("userValidationPoints()")
    public void validateUserIdHeader() {
        String userId = request.getHeader("X-User-Id");
        if (userId == null || userId.isBlank()) {
            throw new UnauthorizedException("Access denied: No authenticated user found");
        }
    }
}
