package com.icc.web.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "cartservice", fallbackFactory = CartClientFallbackFactory.class)
public interface CartClient {
    @GetMapping("/api/v1/purchases/validate/{userId}/{bookId}")
    ResponseEntity<Boolean> validatePurchase(@PathVariable("userId") String userId,
                                             @PathVariable("bookId") String bookId);
}