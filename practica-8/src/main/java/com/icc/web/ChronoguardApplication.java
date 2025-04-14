package com.icc.web;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.theme.Theme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@Theme(value = "chornoguard")
public class ChronoguardApplication implements AppShellConfigurator {

    public static void main(String[] args) {
        SpringApplication.run(ChronoguardApplication.class, args);
    }
}
