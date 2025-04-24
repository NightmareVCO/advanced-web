package com.icc.web.client;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.FallbackFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CartClientFallbackFactory implements FallbackFactory<CartClient> {
    @Override
    public CartClient create(Throwable cause) {
        return new CartClient() {
            @Override
            public ResponseEntity<Boolean> validatePurchase(String userId, String bookId) {
                log.error("Error validating purchase for user {} and book {}: {}",
                        userId, bookId, cause.getMessage());
                // Default to true in case of failure to prevent blocking legitimate reviews
                return ResponseEntity.ok(true);
            }
        };
    }
}