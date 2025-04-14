package com.icc.web.views;

import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.html.Paragraph;
import jakarta.annotation.security.PermitAll;

@Route("")
@PermitAll
@PageTitle("Home | Chrono Guard")
public class LandingView extends VerticalLayout {
    public LandingView() {
        setSizeFull();
        add(new H1("Welcome to Chrono Guard!"));
        add(new Paragraph("This is the landing page of the application."));
        add(new Button("Get Started", e -> Notification.show("Button clicked!")));
    }
}
