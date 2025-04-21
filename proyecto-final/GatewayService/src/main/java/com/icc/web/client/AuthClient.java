package com.icc.web.client;

import com.icc.web.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "authservice", path = "/api/v1/users/", configuration = FeignConfig.class)
public interface AuthClient {

    @GetMapping("/exists-by-id/{id}")
    boolean userExistsById(@PathVariable("id") String id);
}
