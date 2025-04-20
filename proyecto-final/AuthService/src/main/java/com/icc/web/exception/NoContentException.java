package com.icc.web.exception;

import java.io.Serial;

public class NoContentException extends RuntimeException {
    @Serial private static final long serialVersionUID = 1L;

    public NoContentException(String msg) {
        super(msg);
    }
}
