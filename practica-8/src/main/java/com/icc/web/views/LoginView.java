package com.icc.web.views;

import com.icc.web.views.components.AppTitle;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.*;
import com.vaadin.flow.server.auth.AnonymousAllowed;

@Route("login")
@PageTitle("Login | ChronoGuard")
@AnonymousAllowed
public class LoginView extends VerticalLayout implements BeforeEnterObserver {
    private final LoginForm login = new LoginForm();

    public LoginView() {
        if (UI.getCurrent().getSession().getAttribute("authenticated") != null) {
            UI.getCurrent().navigate(LandingView.class);
        }

        setSizeFull();
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);

        login.setForgotPasswordButtonVisible(false);
        login.setAction("login");

        // Check for error parameter in URL
        Location location = UI.getCurrent().getInternals().getActiveViewLocation();
        QueryParameters queryParameters = location.getQueryParameters();

        if (queryParameters.getParameters().containsKey("error")) {
            login.setError(true);
            Notification.show("Invalid username or password",
                            3000, Notification.Position.TOP_CENTER)
                    .addThemeVariants(NotificationVariant.LUMO_ERROR);
        }
        add(new AppTitle("32px"), login);
    }

    @Override
    public void beforeEnter(BeforeEnterEvent event) {
        boolean containsError = event.getLocation().getQueryParameters().getParameters().containsKey("error");
        if (containsError) {
            login.setError(true);
        }
    }
}