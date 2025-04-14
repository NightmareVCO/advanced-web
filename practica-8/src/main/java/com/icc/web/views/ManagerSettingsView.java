package com.icc.web.views;

import com.icc.web.model.UserInfo;
import com.icc.web.services.UserInfoService;
import com.icc.web.utils.constants.Role;
import com.icc.web.views.components.Footer;
import com.icc.web.views.components.Navbar;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
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
        Div pageSection = createFormSection();
        Footer footer = new Footer();

        layout.add(navbar);
        layout.add(pageSection);
        layout.add(footer);

        layout.setFlexGrow(1, pageSection);
        layout.setAlignItems(Alignment.CENTER);
    }

    private Div createFormSection() {
        Div formContainer = new Div();
        formContainer.getStyle().set("display", "flex");
        formContainer.getStyle().set("width", "100%");
        formContainer.getStyle().set("flex-grow", "1");
        formContainer.getStyle().set("align-items", "center");
        formContainer.getStyle().set("justify-content", "center");

        VerticalLayout formLayout = createForm();

        // Add a title to the form
        H2 title = new H2("Profile Settings");
        title.getStyle().set("margin-bottom", "20px");

        formLayout.addComponentAsFirst(title);
        formContainer.add(formLayout);

        return formContainer;
    }

    private VerticalLayout createForm() {
        VerticalLayout formLayout = new VerticalLayout();
        formLayout.setWidth("400px");

        // Load current manager info
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