/* (C)2025 */
package com.icc.web.exception;

import java.io.Serial;

public class BadRequestException extends RuntimeException {

    @Serial private static final long serialVersionUID = 1L;

    public BadRequestException(String message) {
        super(message);
    }
}
