package com.icc.web.views.components;

import com.icc.web.views.EventsView;
import com.icc.web.views.IndexView;
import com.icc.web.views.UserManagementView;
import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.contextmenu.ContextMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.dom.Style;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.server.VaadinService;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class Navbar extends Composite<HorizontalLayout> {
    public Navbar() {
        HorizontalLayout layout = this.getContent();
        Style layoutStyle = layout.getStyle();

        layoutStyle.set("display", "flex");
        layoutStyle.set("width", "100%");
        layoutStyle.set("height", "max-content");
        layoutStyle.set("padding-left", "10px");
        layoutStyle.set("padding-right", "10px");
        layoutStyle.set("padding-top", "5px");
        layoutStyle.set("padding-bottom", "5px");
        layoutStyle.set("align-items", "center");
        layoutStyle.set("justify-content", "space-between");
        layoutStyle.set("background-color", "var(--lumo-primary-color)");

        Div brandSection = brandSection();
        Div navigationSection = navigationSection();
        Div actionSection = actionSection();

        layout.add(brandSection, navigationSection, actionSection);

        layout.setAlignSelf(FlexComponent.Alignment.CENTER, brandSection);
        layout.setAlignSelf(FlexComponent.Alignment.CENTER, navigationSection);
        layout.setAlignSelf(FlexComponent.Alignment.CENTER, actionSection);
    }

    private Div brandSection() {
        Div brandContainer = new Div();

        Image brandLogo = new Image("/images/chronoguard_white.svg", "Chrono Guard Logo");
        brandLogo.setWidth("150px");
        brandContainer.add(brandLogo);

        return brandContainer;
    }

    private Div navigationSection() {
        Div navigationContainer = new Div();
        Style navigationStyle = navigationContainer.getStyle();

        navigationStyle.set("display", "flex");
        navigationStyle.set("align-items", "center");
        navigationStyle.set("justify-content", "center");
        navigationStyle.set("gap", "16px");

        RouterLink homeLink = new RouterLink();
        RouterLink featureLink = new RouterLink();
        RouterLink aboutLink = new RouterLink();
        RouterLink dashboardLink = new RouterLink();

        homeLink.setText("Home");
        homeLink.addClassName("nav-link");
        homeLink.setRoute(IndexView.class);

        aboutLink.setText("Users");
        aboutLink.addClassName("nav-link");
        aboutLink.setRoute(UserManagementView.class);

        dashboardLink.setText("Events");
        dashboardLink.addClassName("nav-link");
        dashboardLink.setRoute(EventsView.class);

        navigationContainer.add(homeLink, featureLink, aboutLink, dashboardLink);

        return navigationContainer;
    }

    private Div avatar() {
        Div avatarContainer = new Div();
        AvatarItem avatarItem = new AvatarItem();
        avatarItem.setWidth("min-content");
        setAvatarItemSampleData(avatarItem);

        avatarContainer.add(avatarItem);

        return avatarContainer;
    }

    private void setAvatarItemSampleData(AvatarItem avatarItem) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null
                && auth.isAuthenticated()
                && !(auth instanceof AnonymousAuthenticationToken)) {
            Object principal = auth.getPrincipal();
            String username = "";
            String role = "";

            if (principal instanceof UserDetails userDetails) {
                username = userDetails.getUsername();
                role =
                        userDetails.getAuthorities().stream()
                                .map(GrantedAuthority::getAuthority)
                                .findFirst()
                                .orElse("User");
            } else {
                username = principal.toString();
                role = "User";
            }

            if (role.startsWith("ROLE_")) {
                role = role.substring(5);
            }

            Avatar avatar = new Avatar(username);

            avatarItem.setHeading(username);
            avatarItem.setDescription(role);
            avatarItem.setAvatar(avatar);

            ContextMenu contextMenu = new ContextMenu();
            contextMenu.setTarget(avatar);
            contextMenu.setOpenOnClick(true); // Se abre al hacer clic en el avatar

            // Add "Settings" option
            contextMenu.addItem("Settings", e -> UI.getCurrent().navigate("settings"));

            // Add "Logout" option
            contextMenu.addItem(
                    "Logout",
                    e -> {
                        VaadinService.getCurrentRequest().getWrappedSession().invalidate();
                        SecurityContextHolder.clearContext();
                        UI.getCurrent().getPage().reload();
                    });
        } else {
            avatarItem.setHeading("Guest");
            avatarItem.setDescription("Not logged in");
            avatarItem.setAvatar(new Avatar("Guest"));
        }
    }

    private Div actionButton() {
        Div actionButtonContainer = new Div();
        actionButtonContainer.getStyle().set("display", "flex");
        actionButtonContainer.getStyle().set("align-items", "center");
        actionButtonContainer.getStyle().set("justify-content", "center");

        Button scheduleButton = new Button();
        scheduleButton.setText("Schedule");
        scheduleButton.getStyle().set("background-color", "var(--white)");

        scheduleButton.addClickListener(event -> {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken) {
                UI.getCurrent().navigate("login");
            } else {
                UI.getCurrent().navigate("events");
            }
        });

        actionButtonContainer.add(scheduleButton);

        return actionButtonContainer;
    }

    private Div actionSection() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Div actionSection = new Div();
        actionSection.getStyle().set("display", "flex");
        actionSection.getStyle().set("align-items", "center");
        actionSection.getStyle().set("justify-content", "center");
        actionSection.getStyle().set("gap", "16px");

        if (auth != null
                && auth.isAuthenticated()
                && !(auth instanceof AnonymousAuthenticationToken)) {
            actionSection.add(avatar());
        }

        actionSection.add(actionButton());

        return actionSection;
    }
}
