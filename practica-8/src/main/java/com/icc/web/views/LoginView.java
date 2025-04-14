package com.icc.web.views;

import com.icc.web.views.components.Footer;
import com.icc.web.views.components.Navbar;
import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.dom.Style;
import com.vaadin.flow.router.*;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Route("login")
@PageTitle("Login | ChronoGuard")
@AnonymousAllowed
public class LoginView extends Composite<VerticalLayout> implements BeforeEnterObserver {
    private final LoginForm login = new LoginForm();

    public LoginView() {
        VerticalLayout layout = this.getContent();
        Style layoutStyle = layout.getStyle();
        layoutStyle.set("width", "100%");
        layoutStyle.set("height", "100%");
        layoutStyle.set("padding", "0");
        layoutStyle.set("margin", "0");

        Navbar navbar = new Navbar();
        Div pageSection = loginSection();
        Footer footer = new Footer();

        layout.add(navbar);
        layout.add(pageSection);
        layout.add(footer);

        layout.setFlexGrow(1, pageSection);
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
    }

    public Div loginSection() {
        Div loginContainer = new Div();
        loginContainer.getStyle().set("display", "flex");
        loginContainer.getStyle().set("width", "100%");
        loginContainer.getStyle().set("flex-grow", "1");
        loginContainer.getStyle().set("align-items", "center");
        loginContainer.getStyle().set("justify-content", "space-between");

        VerticalLayout formContainer = new VerticalLayout();
        formContainer.getStyle().set("display", "flex");
        formContainer.getStyle().set("align-items", "center");
        formContainer.getStyle().set("justify-content", "center");

        VerticalLayout formImageContainer = new VerticalLayout();
        formImageContainer.getStyle().set("display", "flex");
        formImageContainer.getStyle().set("align-items", "center");
        formImageContainer.getStyle().set("justify-content", "center");

        Image brandImage = new Image("/images/chronoguard.svg", "Chrono Guard");
        brandImage.setWidth("250px");

        login.setForgotPasswordButtonVisible(false);
        login.setAction("login");

        formContainer.add(brandImage, login);

        Image loginImage = new Image("/images/login.svg", "Login");
        loginImage.setWidth("550px");

        formImageContainer.add(loginImage);

        loginContainer.add(formContainer, formImageContainer);

        return loginContainer;
    }

    @Override
    public void beforeEnter(BeforeEnterEvent event) {
        if (isAuthenticated()) {
            event.forwardTo(IndexView.class);
        } else {
            boolean containsError =
                    event.getLocation().getQueryParameters().getParameters().containsKey("error");
            if (containsError) {
                login.setError(true);
            }
        }
    }

    private boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null
                && authentication.isAuthenticated()
                && !(authentication
                        instanceof
                        org.springframework.security.authentication.AnonymousAuthenticationToken);
    }
}
