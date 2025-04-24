package com.icc.web.aspect;

import com.icc.web.exception.SecurityException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class GatewayValidationAspect {
    private final HttpServletRequest request;

    @Value("${gateway.secret}")
    private String gatewaySecret;

    @Pointcut(
            "@within(com.icc.web.annotation.GatewayValidation) ||"
                    + " @annotation(com.icc.web.annotation.GatewayValidation)")
    public void gatewayValidationPoints() {}

    @Before("gatewayValidationPoints()")
    public void validateGatewaySecret() {
        String receivedSecret = request.getHeader("X-Gateway-Secret");
        if (receivedSecret == null) {
            throw new SecurityException("Access denied: No allowed origin");
        }

        boolean isGatewaySecretCorrect = gatewaySecret.equals(receivedSecret);
        if (!isGatewaySecretCorrect) {
            throw new SecurityException("Access denied: No allowed origin");
        }
    }
}
