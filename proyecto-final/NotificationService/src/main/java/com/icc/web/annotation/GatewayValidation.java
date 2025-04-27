package com.icc.web.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation to request a validation from the gateway.
 * This annotation can be used for controllers that require validation
 * from the gateway before processing the request.
 * The gateway will check the gateway secret key.
 */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface GatewayValidation {}
