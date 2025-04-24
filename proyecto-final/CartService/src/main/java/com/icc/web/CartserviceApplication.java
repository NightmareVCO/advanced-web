package com.icc.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class CartserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CartserviceApplication.class, args);
    }
}
