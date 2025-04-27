package com.icc.web.util;

import com.icc.web.model.UserInfo;
import com.icc.web.service.UserInfoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class AdminGenerator implements ApplicationRunner {

    private final UserInfoService userInfoService;

    @Override
    public void run(org.springframework.boot.ApplicationArguments args) {
        String username = "admin";
        String email = "admin@example.com";
        String firstName = "Admin";
        String lastName = "Admin";
        String password = "admin";
        String role = "ADMIN";
        boolean active = true;
        boolean adminExists = userInfoService.existsByUsername(username)
                || userInfoService.existsByEmail(email);

        if (!adminExists) {
            UserInfo adminUser = UserInfo.builder()
                    .id(new ObjectId())
                    .firstName(firstName)
                    .lastName(lastName)
                    .username(username)
                    .email(email)
                    .password(password)
                    .role(role)
                    .active(active)
                    .build();

            userInfoService.saveUser(adminUser);
            log.info("Default admin user created successfully.");
        } else {
            log.info("Admin user already exists.");
        }
    }
}