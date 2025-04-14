package com.icc.web.views;

import com.icc.web.model.UserInfo;
import com.icc.web.services.UserInfoService;
import com.icc.web.utils.constants.Role;
import com.icc.web.views.components.Footer;
import com.icc.web.views.components.Navbar;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.dom.Style;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.security.core.context.SecurityContextHolder;

@Route("settings")
@PageTitle("Manager Settings")
@RolesAllowed({Role.USER, Role.ADMIN}) // Permitir acceso a ambos roles
public class ManagerSettingsView extends VerticalLayout {

    private final UserInfoService userInfoService;

    private final TextField nameField = new TextField("Name");
    private final EmailField emailField = new EmailField("Email");

    public ManagerSettingsView(UserInfoService userInfoService) {
        this.userInfoService = userInfoService;

        VerticalLayout layout = this;
        Style layoutStyle = layout.getStyle();
        layoutStyle.set("width", "100%");
        layoutStyle.set("height", "100%");
        layoutStyle.set("padding", "0");
        layoutStyle.set("margin", "0");

        Navbar navbar = new Navbar();
        Div pageSection = pageSection();
        Footer footer = new Footer();

        layout.add(navbar);
        layout.add(pageSection);
        layout.add(footer);

        layout.setFlexGrow(1, pageSection);
        layout.setAlignItems(Alignment.CENTER);
    }

    private Div pageSection() {
        Div pageContainer = new Div();
        pageContainer.getStyle().set("display", "flex");
        pageContainer.getStyle().set("width", "100%");
        pageContainer.getStyle().set("flex-grow", "1");
        pageContainer.getStyle().set("align-items", "center");
        pageContainer.getStyle().set("justify-content", "center");

        VerticalLayout formContainer = createForm();
        VerticalLayout formImageContainer = new VerticalLayout();

        // Add a title to the form
        H2 title = new H2("Profile Settings");
        Style titleStyle = title.getStyle();
        titleStyle.set("color", "var(--lumo-primary-text-color)");
        titleStyle.set("white-space", "nowrap");

        Image settingImage = new Image("/images/settings.svg", "Settings");
        settingImage.setWidth("650px");

        formImageContainer.add(settingImage);
        Style formImageContainerStyle = formImageContainer.getStyle();

        formImageContainerStyle.set("display", "flex");
        formImageContainerStyle.set("align-items", "center");
        formImageContainerStyle.set("justify-content", "center");

        formContainer.addComponentAsFirst(title);
        pageContainer.add(formContainer, formImageContainer);

        return pageContainer;
    }

    private VerticalLayout createForm() {
        VerticalLayout formLayout = new VerticalLayout();
        Style formLayoutStyle = formLayout.getStyle();
        formLayoutStyle.set("display", "flex");
        formLayoutStyle.set("width", "100%");
        formLayoutStyle.set("background-color", "var(--white)");
        formLayoutStyle.set("align-items", "center");
        formLayoutStyle.set("justify-content", "center");
        formLayoutStyle.set("padding", "20px");
        
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        UserInfo currentUser = userInfoService.findByUsername(currentUsername);

        if (currentUser != null) {
            nameField.setValue(currentUser.getName() != null ? currentUser.getName() : "");
            emailField.setValue(currentUser.getEmail() != null ? currentUser.getEmail() : "");
        }

        Button saveButton = new Button("Save", event -> saveManagerInfo(currentUser));
        saveButton.getStyle().set("background-color", "#58bc82").set("color", "white");

        formLayout.add(nameField, emailField, saveButton);
        return formLayout;
    }

    private void saveManagerInfo(UserInfo currentUser) {
        try {
            currentUser.setName(nameField.getValue());
            currentUser.setEmail(emailField.getValue());

            userInfoService.updateWithoutPassword(currentUser);

            Notification.show("Your information has been updated successfully", 3000, Notification.Position.BOTTOM_END)
                    .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
        } catch (Exception e) {
            Notification.show("Error updating your information: " + e.getMessage(), 3000, Notification.Position.BOTTOM_END)
                    .addThemeVariants(NotificationVariant.LUMO_ERROR);
        }
    }
}