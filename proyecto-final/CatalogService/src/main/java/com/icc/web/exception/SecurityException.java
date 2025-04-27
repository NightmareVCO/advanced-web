package com.icc.web.exception;

import java.io.Serial;

public class SecurityException extends RuntimeException {
    @Serial private static final long serialVersionUID = 1L;

    public SecurityException(String msg) {
        super(msg);
    }
}
