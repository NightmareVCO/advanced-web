package com.icc.web.views;

import com.icc.web.model.UserInfo;
import com.icc.web.services.UserInfoService;
import com.icc.web.utils.constants.Role;
import com.icc.web.views.components.Footer;
import com.icc.web.views.components.Navbar;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.dom.Style;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;
import java.util.Arrays;
import java.util.List;
import org.springframework.security.core.context.SecurityContextHolder;

@Route("admin/users")
@PageTitle("User Management")
@RolesAllowed(Role.ADMIN)
public class UserManagementView extends Composite<VerticalLayout> {

    private final UserInfoService userInfoService;
    private Grid<UserInfo> grid;

    private final TextField username = new TextField("Username");
    private final TextField name = new TextField("Name");
    private final EmailField email = new EmailField("Email");
    private final PasswordField password = new PasswordField("Password");
    private final PasswordField confirmPassword = new PasswordField("Confirm password");
    private final Select<String> role = new Select<>();

    private final Binder<UserInfo> binder = new Binder<>(UserInfo.class);

    public UserManagementView(UserInfoService userInfoService) {
        this.userInfoService = userInfoService;
        VerticalLayout layout = this.getContent();
        Style layoutStyle = layout.getStyle();
        layoutStyle.set("width", "100%");
        layoutStyle.set("height", "100%");
        layoutStyle.set("padding", "0");
        layoutStyle.set("margin", "0");

        Navbar navbar = new Navbar();
        Div pageSection = pageSection();
        Footer footer = new Footer();

        layout.add(navbar, pageSection, footer);

        layout.setFlexGrow(1, pageSection);
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
    }

    private Div pageSection() {
        Div pageContainer = new Div();
        Style pageContainerStyle = pageContainer.getStyle();

        pageContainerStyle.set("display", "flex");
        pageContainerStyle.set("width", "95%");
        pageContainerStyle.set("flex-direction", "column");
        pageContainerStyle.set("flex-grow", "1");
        pageContainerStyle.set("padding", "20px");
        pageContainerStyle.set("align-items", "center");
        pageContainerStyle.set("justify-content", "center");

        HorizontalLayout header = new HorizontalLayout();
        Style headerStyle = header.getStyle();

        headerStyle.set("display", "flex");
        headerStyle.set("width", "100%");
        headerStyle.set("align-items", "center");
        headerStyle.set("justify-content", "space-between");
        headerStyle.set("padding", "20px 0");

        H2 title = new H2("User Management");
        title.getStyle().set("color", "var(--lumo-primary-text-color)");

        Button createUserBtn = new Button("Create User", VaadinIcon.PLUS.create());
        createUserBtn.setIconAfterText(true);
        Dialog formDialog = createUserDialog();

        createUserBtn.addClickListener(click -> formDialog.open());

        header.add(title, createUserBtn);

        setupBinder();
        setupGrid();

        pageContainer.add(header, grid);

        grid.setSizeFull();

        return pageContainer;
    }

    private void setupBinder() {
        List<Component> fields =
                Arrays.asList(username, name, email, password, confirmPassword, role);
        fields.forEach(field -> field.getElement().getStyle().set("width", "100%"));

        role.setLabel("Role");
        role.setItems(Role.ADMIN, Role.USER);
        role.setValue(Role.USER);

        binder.forField(username)
                .asRequired("Username is required")
                .withValidator(
                        username -> !username.contains(" "), "Username must not contain spaces")
                .withValidator(
                        username -> {
                            UserInfo existing = userInfoService.findByUsername(username);
                            return existing == null;
                        },
                        "Username already exists")
                .bind(UserInfo::getUsername, UserInfo::setUsername);

        binder.forField(name)
                .asRequired("Name is required")
                .bind(UserInfo::getName, UserInfo::setName);

        binder.forField(email)
                .asRequired("Email is required")
                .bind(UserInfo::getEmail, UserInfo::setEmail);

        binder.forField(password)
                .asRequired("Password is required")
                .withValidator(
                        password -> password.length() >= 6,
                        "Password must be at least 6 characters long")
                .bind(UserInfo::getPassword, UserInfo::setPassword);

        // Setup password confirmation validation
        password.addValueChangeListener(
                event -> {
                    if (!password.getValue().equals(confirmPassword.getValue())) {
                        confirmPassword.setErrorMessage("Passwords do not match");
                        confirmPassword.setInvalid(true);
                    } else {
                        confirmPassword.setInvalid(false);
                    }
                });

        confirmPassword.addValueChangeListener(
                event -> {
                    if (!confirmPassword.getValue().equals(password.getValue())) {
                        confirmPassword.setErrorMessage("Passwords do not match");
                        confirmPassword.setInvalid(true);
                    } else {
                        confirmPassword.setInvalid(false);
                    }
                });


        binder.forField(role)
                .asRequired("Role is required")
                .bind(UserInfo::getRole, UserInfo::setRole);
    }

    private void setupGrid() {
        grid = new Grid<>(UserInfo.class, false);
        grid.addColumn(UserInfo::getId).setHeader("ID").setAutoWidth(true);
        grid.addColumn(UserInfo::getName).setHeader("Name").setAutoWidth(true);
        grid.addColumn(UserInfo::getUsername).setHeader("Username").setAutoWidth(true);
        grid.addColumn(UserInfo::getEmail).setHeader("Email").setAutoWidth(true);
        grid.addColumn(UserInfo::getRole).setHeader("Role").setAutoWidth(true);
        grid.addColumn(user -> user.isActive() ? "Active" : "Inactive")
                .setHeader("Status")
                .setAutoWidth(true);

        grid.addComponentColumn(
                        user -> {
                            HorizontalLayout actions = new HorizontalLayout();

                            // Can't delete the current user or the admin user
                            String currentUsername =
                                    SecurityContextHolder.getContext()
                                            .getAuthentication()
                                            .getName();
                            boolean isSelf = user.getUsername().equals(currentUsername);
                            boolean isAdmin = user.getUsername().equals("admin");

                            Button deleteBtn =
                                    new Button(
                                            new Icon(VaadinIcon.TRASH),
                                            click -> confirmDelete(user));
                            deleteBtn.addThemeVariants(
                                    ButtonVariant.LUMO_ERROR, ButtonVariant.LUMO_SMALL);
                            deleteBtn.setEnabled(!isSelf && !isAdmin);

                            Button toggleActiveBtn =
                                    new Button(
                                            user.isActive()
                                                    ? VaadinIcon.BAN.create()
                                                    : VaadinIcon.CHECK.create(),
                                            click -> toggleUserActive(user));
                            toggleActiveBtn.addThemeVariants(
                                    ButtonVariant.LUMO_CONTRAST, ButtonVariant.LUMO_SMALL);
                            toggleActiveBtn.setEnabled(!isSelf && !isAdmin);

                            actions.add(deleteBtn, toggleActiveBtn);
                            return actions;
                        })
                .setHeader("Actions")
                .setAutoWidth(true);

        grid.setItems(query -> {
            int offset = query.getOffset();
            int limit = query.getLimit();

            org.springframework.data.domain.PageRequest pageRequest =
                    org.springframework.data.domain.PageRequest.of(offset / limit, limit);

            org.springframework.data.domain.Page<UserInfo> page = userInfoService.findAll(pageRequest);

            return page.stream();
        }, query -> {
            return (int) userInfoService.findAll().size();
        });

        grid.setSizeFull();
    }

    private Dialog createUserDialog() {
        var dialog = new Dialog();
        dialog.setHeaderTitle("Create new user");

        var mainLayout = new VerticalLayout();
        mainLayout.setSpacing(false);
        mainLayout.setPadding(false);
        mainLayout.setAlignItems(FlexComponent.Alignment.STRETCH);

        var formLayout = new FormLayout();
        formLayout.setResponsiveSteps(
                new FormLayout.ResponsiveStep("0", 1), new FormLayout.ResponsiveStep("500px", 2));

        formLayout.add(username, name, email, password, confirmPassword, role);

        formLayout.setColspan(username, 2);
        formLayout.setColspan(name, 2);
        formLayout.setColspan(email, 2);
        formLayout.setColspan(password, 1);
        formLayout.setColspan(confirmPassword, 1);
        formLayout.setColspan(role, 2);

        dialog.getElement()
                .getStyle()
                .set("min-width", "300px")
                .set("max-width", "100%")
                .set("width", "600px");

        var cancelBtn = new Button("Cancel");
        cancelBtn.addClickListener(
                click -> {
                    dialog.close();
                    clearForm();
                });

        var submitBtn = new Button("Create");
        submitBtn.getStyle().setBackgroundColor("#58bc82").setColor("white");

        submitBtn.addClickListener(
                click -> {
                    if (password.getValue().equals(confirmPassword.getValue())) {
                        UserInfo userInfo = new UserInfo();
                        if (binder.writeBeanIfValid(userInfo)) {
                            createUser(userInfo, dialog);
                        }
                    } else {
                        Notification.show(
                                        "Passwords do not match",
                                        3000,
                                        Notification.Position.BOTTOM_END)
                                .addThemeVariants(NotificationVariant.LUMO_ERROR);
                    }
                });

        var buttonGroup = new HorizontalLayout();
        buttonGroup.setWidthFull();
        buttonGroup.getStyle().setPaddingTop("10px");
        buttonGroup.setSpacing(true);
        buttonGroup.setJustifyContentMode(FlexComponent.JustifyContentMode.BETWEEN);
        buttonGroup.add(cancelBtn, submitBtn);

        mainLayout.add(formLayout, buttonGroup);
        dialog.add(mainLayout);

        return dialog;
    }

    private void openEditDialog(UserInfo user) {
        var dialog = new Dialog();
        dialog.setHeaderTitle("Edit User: " + user.getUsername());

        // Create a copy of the user to avoid modifying the original directly
        UserInfo editedUser = new UserInfo();
        editedUser.setId(user.getId());
        editedUser.setUsername(user.getUsername());
        editedUser.setName(user.getName());
        editedUser.setEmail(user.getEmail());
        editedUser.setRole(user.getRole());
        editedUser.setActive(user.isActive());
        // Don't copy password - will be set only if changed

        var mainLayout = new VerticalLayout();
        mainLayout.setSpacing(false);
        mainLayout.setPadding(false);
        mainLayout.setAlignItems(FlexComponent.Alignment.STRETCH);

        var formLayout = new FormLayout();
        formLayout.setResponsiveSteps(
                new FormLayout.ResponsiveStep("0", 1),
                new FormLayout.ResponsiveStep("500px", 2)
        );

        // Username field (read-only)
        TextField usernameField = new TextField("Username");
        usernameField.setValue(user.getUsername());
        usernameField.setReadOnly(true);

        // Name field
        TextField nameField = new TextField("Name");
        nameField.setValue(user.getName());

        // Email field
        EmailField emailField = new EmailField("Email");
        emailField.setValue(user.getEmail());

        // Role field
        Select<String> roleField = new Select<>();
        roleField.setLabel("Role");
        roleField.setItems(Role.ADMIN, Role.USER);
        roleField.setValue(user.getRole());

        // Password fields (optional for editing)
        PasswordField passwordField = new PasswordField("New Password (leave blank to keep current)");
        PasswordField confirmPasswordField = new PasswordField("Confirm New Password");

        // Add validation for password confirmation
        passwordField.addValueChangeListener(event -> {
            if (!passwordField.isEmpty() && !passwordField.getValue().equals(confirmPasswordField.getValue())) {
                confirmPasswordField.setErrorMessage("Passwords do not match");
                confirmPasswordField.setInvalid(true);
            } else {
                confirmPasswordField.setInvalid(false);
            }
        });

        confirmPasswordField.addValueChangeListener(event -> {
            if (!passwordField.isEmpty() && !passwordField.getValue().equals(confirmPasswordField.getValue())) {
                confirmPasswordField.setErrorMessage("Passwords do not match");
                confirmPasswordField.setInvalid(true);
            } else {
                confirmPasswordField.setInvalid(false);
            }
        });

        formLayout.add(usernameField, nameField, emailField, roleField, passwordField, confirmPasswordField);

        formLayout.setColspan(usernameField, 2);
        formLayout.setColspan(nameField, 2);
        formLayout.setColspan(emailField, 2);
        formLayout.setColspan(roleField, 2);
        formLayout.setColspan(passwordField, 1);
        formLayout.setColspan(confirmPasswordField, 1);

        dialog.getElement().getStyle()
                .set("min-width", "300px")
                .set("max-width", "100%")
                .set("width", "600px");

        var cancelBtn = new Button("Cancel");
        cancelBtn.addClickListener(click -> dialog.close());

        var saveBtn = new Button("Save");
        saveBtn.getStyle().setBackgroundColor("#58bc82").setColor("white");
        saveBtn.addClickListener(click -> {
            // Validate passwords match if a new password was entered
            if (!passwordField.isEmpty() && !passwordField.getValue().equals(confirmPasswordField.getValue())) {
                Notification.show("Passwords do not match",
                                3000, Notification.Position.BOTTOM_END)
                        .addThemeVariants(NotificationVariant.LUMO_ERROR);
                return;
            }

            // Update user object
            editedUser.setName(nameField.getValue());
            editedUser.setEmail(emailField.getValue());
            editedUser.setRole(roleField.getValue());

            // Only set password if a new one was provided
            if (!passwordField.isEmpty()) {
                editedUser.setPassword(passwordField.getValue());
            } else {
                // Keep existing password (set to null to prevent re-encoding)
                editedUser.setPassword(null);
            }

            updateUser(editedUser, dialog);
        });

        var buttonGroup = new HorizontalLayout();
        buttonGroup.setWidthFull();
        buttonGroup.getStyle().setPaddingTop("10px");
        buttonGroup.setSpacing(true);
        buttonGroup.setJustifyContentMode(FlexComponent.JustifyContentMode.END);
        buttonGroup.add(cancelBtn, saveBtn);

        mainLayout.add(formLayout, buttonGroup);
        dialog.add(mainLayout);
        dialog.open();
    }

    private void updateUser(UserInfo editedUser, Dialog dialog) {
        try {
            // Get the original user to preserve password if not changed
            UserInfo originalUser = userInfoService.findByUsername(editedUser.getUsername());

            // If password is null, keep the original password
            if (editedUser.getPassword() == null) {
                editedUser.setPassword(originalUser.getPassword());
            }

            userInfoService.save(editedUser);
            Notification.show("User updated successfully",
                            3000, Notification.Position.BOTTOM_END)
                    .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
            dialog.close();
            refreshGrid();
        } catch (Exception e) {
            Notification.show("Error updating user: " + e.getMessage(),
                            3000, Notification.Position.BOTTOM_END)
                    .addThemeVariants(NotificationVariant.LUMO_ERROR);
        }
    }

    private void createUser(UserInfo user, Dialog dialog) {
        try {
            userInfoService.save(user);
            Notification.show("User created successfully", 3000, Notification.Position.BOTTOM_END)
                    .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
            dialog.close();
            refreshGrid();
            clearForm();
        } catch (Exception e) {
            Notification.show(
                            "Error creating user: " + e.getMessage(),
                            3000,
                            Notification.Position.BOTTOM_END)
                    .addThemeVariants(NotificationVariant.LUMO_ERROR);
        }
    }

    private void clearForm() {
        username.clear();
        name.clear();
        email.clear();
        password.clear();
        confirmPassword.clear();
        role.setValue(Role.USER);
        binder.readBean(null);
    }

    private void confirmDelete(UserInfo user) {
        Dialog confirmDialog = new Dialog();
        confirmDialog.setHeaderTitle("Confirm Delete");

        VerticalLayout content = new VerticalLayout();
        content.add("Are you sure you want to delete user: " + user.getUsername() + "?");

        HorizontalLayout buttons = new HorizontalLayout();
        Button cancelButton = new Button("Cancel", e -> confirmDialog.close());
        Button deleteButton =
                new Button(
                        "Delete",
                        e -> {
                            deleteUser(user);
                            confirmDialog.close();
                        });
        deleteButton.addThemeVariants(ButtonVariant.LUMO_ERROR);

        buttons.add(cancelButton, deleteButton);
        buttons.setWidthFull();
        buttons.setJustifyContentMode(FlexComponent.JustifyContentMode.BETWEEN);

        content.add(buttons);
        content.setWidthFull();

        confirmDialog.add(content);
        confirmDialog.open();
    }

    private void deleteUser(UserInfo user) {
        try {
            userInfoService.deleteById(user.getId());
            Notification.show("User deleted", 3000, Notification.Position.BOTTOM_END)
                    .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
            refreshGrid();
        } catch (Exception e) {
            Notification.show(
                            "Error deleting user: " + e.getMessage(),
                            3000,
                            Notification.Position.BOTTOM_END)
                    .addThemeVariants(NotificationVariant.LUMO_ERROR);
        }
    }


    private void toggleUserActive(UserInfo user) {
        try {
            user.setActive(!user.isActive());
            userInfoService.save(user);
            String status = user.isActive() ? "activated" : "deactivated";
            Notification.show("User " + status, 3000, Notification.Position.BOTTOM_END)
                    .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
            refreshGrid();
        } catch (Exception e) {
            Notification.show(
                            "Error updating user: " + e.getMessage(),
                            3000,
                            Notification.Position.BOTTOM_END)
                    .addThemeVariants(NotificationVariant.LUMO_ERROR);
        }
    }

    private void refreshGrid() {
        grid.getDataProvider().refreshAll();
    }
}
