/* (C)2025 */
package com.icc.web.exception;

import java.io.Serial;

public class InternalServerError extends RuntimeException {
    @Serial private static final long serialVersionUID = 1L;

    public InternalServerError(String msg) {
        super(msg);
    }
}
