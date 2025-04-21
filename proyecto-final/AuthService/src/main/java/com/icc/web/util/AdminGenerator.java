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
        String adminUsername = "admin";
        String adminEmail = "admin@example.com";

        boolean adminExists = userInfoService.existsByUsername(adminUsername)
                || userInfoService.existsByEmail(adminEmail);

        if (!adminExists) {
            UserInfo adminUser = UserInfo.builder()
                    .id(new ObjectId())
                    .username(adminUsername)
                    .email(adminEmail)
                    .password("admin")
                    .role("ADMIN")
                    .active(true)
                    .build();

            userInfoService.saveUser(adminUser);
            log.info("Default admin user created successfully.");
        } else {
            log.info("Admin user already exists.");
        }
    }
}