package com.icc.web.exception;

public class NoContentException extends RuntimeException {
  private static final long serialVersionUID = 1L;

  public NoContentException(String msg) {
    super(msg);
  }
}
