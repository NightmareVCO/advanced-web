package com.icc.web.views;

import com.icc.web.model.CustomEntry;
import com.icc.web.model.Event;
import com.icc.web.model.UserInfo;
import com.icc.web.services.EmailService;
import com.icc.web.services.EventService;
import com.icc.web.services.UserInfoService;
import com.icc.web.utils.constants.Role;
import com.icc.web.views.components.Footer;
import com.icc.web.views.components.Navbar;
import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.dom.Style;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.vaadin.stefan.fullcalendar.Entry;
import org.vaadin.stefan.fullcalendar.FullCalendar;
import org.vaadin.stefan.fullcalendar.FullCalendarBuilder;

@Route("events")
@RolesAllowed({Role.USER, Role.ADMIN})
@PageTitle("Home | Chrono Guard")
public class EventsView extends Composite<VerticalLayout> {
    private final EventService eventService;
    private final UserInfoService userInfoService;
    private final EmailService emailService;
    private FullCalendar calendar;

    public EventsView(
            EventService eventService, UserInfoService userInfoService, EmailService emailService) {
        this.eventService = eventService;
        this.userInfoService = userInfoService;
        this.emailService = emailService;

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
        loadUserEvents();
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

        H2 title = new H2("Event Management");
        Style titleStyle = title.getStyle();
        titleStyle.set("color", "var(--lumo-primary-text-color)");
        titleStyle.set("white-space", "nowrap");

        Div calendarButtons = new Div();
        Style calendarButtonsStyle = calendarButtons.getStyle();
        calendarButtonsStyle.set("display", "flex");
        calendarButtonsStyle.set("width", "100%");
        calendarButtonsStyle.set("align-items", "center");
        calendarButtonsStyle.set("justify-content", "end");
        calendarButtonsStyle.set("gap", "8px");

        Button prevMonth = new Button("Prev Month", VaadinIcon.ARROW_LEFT.create());
        prevMonth.addClickListener(event -> calendar.previous());

        Button nextMonth = new Button("Next Month", VaadinIcon.ARROW_RIGHT.create());
        nextMonth.setIconAfterText(true);
        nextMonth.addClickListener(event -> calendar.next());

        Button addButton = new Button("Add Event", VaadinIcon.PLUS.create());
        addButton.setIconAfterText(true);
        addButton.addClickListener(
                event -> {
                    Dialog eventDialog =
                            createEventDialog(
                                    LocalDateTime.now(),
                                    LocalDateTime.now().plusHours(1),
                                    calendar);
                    eventDialog.open();
                });

        calendarButtons.add(prevMonth, nextMonth, addButton);
        header.add(title, calendarButtons);

        VerticalLayout calendarContainer = new VerticalLayout();
        Style calendarContainerStyle = calendarContainer.getStyle();
        calendarContainerStyle.set("display", "flex");
        calendarContainerStyle.set("width", "100%");
        calendarContainerStyle.set("height", "100%");
        calendarContainerStyle.set("flex-grow", "1");
        calendarContainerStyle.set("align-items", "center");
        calendarContainerStyle.set("justify-content", "center");
        calendarContainerStyle.set("padding", "20px");
        calendarContainerStyle.set("border-radius", "var(--lumo-border-radius-m)");
        calendarContainerStyle.set("background-color", "var(--gray)");

        calendar = FullCalendarBuilder.create().build();
        calendar.setSizeFull();

        calendar.addTimeslotsSelectedListener(
                selectionEvent -> {
                    Dialog eventDialog =
                            createEventDialog(
                                    selectionEvent.getStart(), selectionEvent.getEnd(), calendar);
                    eventDialog.open();
                });
        calendar.addTimeslotClickedListener(
                dateClickEvent -> {
                    LocalDate clickedDate = dateClickEvent.getDate();
                    Dialog eventDialog =
                            createEventDialog(
                                    clickedDate.atStartOfDay(),
                                    clickedDate.atStartOfDay().plusHours(1),
                                    calendar);
                    eventDialog.open();
                });
        calendar.addEntryClickedListener(
                clickedEvent -> {
                    Entry clickedEntry = clickedEvent.getEntry();
                    if (clickedEntry instanceof CustomEntry) {
                        String eventIdStr = ((CustomEntry) clickedEntry).getEventId();
                        if (eventIdStr != null) {
                            try {
                                Long eventId = Long.valueOf(eventIdStr);
                                Optional<Event> optEvent = eventService.findById(eventId);
                                if (optEvent.isPresent()) {
                                    Dialog editDialog =
                                            createEditEventDialog(optEvent.get(), calendar);
                                    editDialog.open();
                                }
                            } catch (NumberFormatException ex) {
                                ex.printStackTrace();
                            }
                        }
                    }
                });
        calendar.addEntryDroppedListener(
                dropEvent -> {
                    Entry droppedEntry = dropEvent.getEntry();
                    if (droppedEntry instanceof CustomEntry) {
                        CustomEntry updatedEntry =
                                (CustomEntry) dropEvent.createCopyBasedOnChanges();
                        String eventIdStr = updatedEntry.getEventId();
                        if (eventIdStr != null) {
                            try {
                                Long eventId = Long.valueOf(eventIdStr);
                                Optional<Event> optEvent = eventService.findById(eventId);
                                if (optEvent.isPresent()) {
                                    Event event = optEvent.get();
                                    event.setStartDateTime(updatedEntry.getStart());
                                    event.setEndDateTime(updatedEntry.getEnd());
                                    eventService.save(event);
                                    loadUserEvents();
                                    Notification.show(
                                                    "Event rescheduled",
                                                    3000,
                                                    Notification.Position.BOTTOM_END)
                                            .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
                                }
                            } catch (NumberFormatException ex) {
                                ex.printStackTrace();
                            }
                        }
                    }
                });

        calendarContainer.add(calendar);
        calendarContainer.setFlexGrow(1, calendar);
        pageContainer.add(header, calendarContainer);

        return pageContainer;
    }

    private Dialog createEventDialog(
            LocalDateTime start, LocalDateTime end, FullCalendar calendar) {
        Dialog dialog = new Dialog();
        dialog.setHeaderTitle("Create Event");

        VerticalLayout mainLayout = new VerticalLayout();
        mainLayout.setSpacing(false);
        mainLayout.setPadding(false);
        mainLayout.setAlignItems(FlexComponent.Alignment.STRETCH);

        FormLayout formLayout = new FormLayout();
        TextField titleField = new TextField("Title");
        TextArea descriptionField = new TextArea("Description");
        DateTimePicker startPicker = new DateTimePicker("Start Date & Time");
        DateTimePicker endPicker = new DateTimePicker("End Date & Time");

        startPicker.setValue(start);
        endPicker.setValue(end);
        formLayout.add(titleField, descriptionField, startPicker, endPicker);
        formLayout.setResponsiveSteps(
                new FormLayout.ResponsiveStep("0", 1), new FormLayout.ResponsiveStep("500px", 2));

        Binder<Event> binder = new Binder<>(Event.class);
        binder.forField(titleField)
                .asRequired("Title is required")
                .bind(Event::getTitle, Event::setTitle);
        binder.forField(descriptionField).bind(Event::getDescription, Event::setDescription);
        binder.forField(startPicker)
                .asRequired("Start date and time is required")
                .bind(Event::getStartDateTime, Event::setStartDateTime);
        binder.forField(endPicker)
                .asRequired("End date and time is required")
                .withValidator(
                        endDate -> endDate.isAfter(startPicker.getValue()),
                        "End date must be after start date")
                .bind(Event::getEndDateTime, Event::setEndDateTime);

        Button cancelBtn = new Button("Cancel", e -> dialog.close());
        Button saveBtn =
                new Button(
                        "Save",
                        e -> {
                            Event newEvent = new Event();
                            if (binder.writeBeanIfValid(newEvent)) {
                                UserInfo currentUser = getCurrentUser();
                                if (currentUser != null) {
                                    newEvent.setUser(currentUser);
                                    newEvent = eventService.save(newEvent);

                                    emailService.sendEventConfirmationEmail(newEvent);

                                    CustomEntry newEntry = new CustomEntry();
                                    newEntry.setEventId(newEvent.getId().toString());
                                    newEntry.setTitle(newEvent.getTitle());
                                    newEntry.setStart(newEvent.getStartDateTime());
                                    newEntry.setEnd(newEvent.getEndDateTime());
                                    calendar.getEntryProvider().asInMemory().addEntries(newEntry);
                                    calendar.getEntryProvider().refreshAll();
                                    Notification.show(
                                                    "Event created",
                                                    3000,
                                                    Notification.Position.BOTTOM_END)
                                            .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
                                }
                                dialog.close();
                            }
                        });

        saveBtn.addThemeName("primary");
        HorizontalLayout buttonLayout = new HorizontalLayout();
        Style buttonLayoutStyle = buttonLayout.getStyle();

        buttonLayoutStyle.set("display", "flex");
        buttonLayoutStyle.set("width", "100%");
        buttonLayoutStyle.set("align-items", "center");
        buttonLayoutStyle.set("justify-content", "space-between");
        buttonLayoutStyle.set("padding", "20px 0");

        buttonLayout.add(cancelBtn, saveBtn);
        mainLayout.add(formLayout, buttonLayout);

        dialog.add(mainLayout);

        return dialog;
    }

    private Dialog createEditEventDialog(Event event, FullCalendar calendar) {
        Dialog dialog = new Dialog();
        dialog.setHeaderTitle("Edit Event");
        VerticalLayout mainLayout = new VerticalLayout();
        mainLayout.setSpacing(false);
        mainLayout.setPadding(false);
        mainLayout.setAlignItems(FlexComponent.Alignment.STRETCH);

        FormLayout formLayout = new FormLayout();
        TextField titleField = new TextField("Title");
        TextArea descriptionField = new TextArea("Description");
        DateTimePicker startPicker = new DateTimePicker("Start Date & Time");
        DateTimePicker endPicker = new DateTimePicker("End Date & Time");
        formLayout.add(titleField, descriptionField, startPicker, endPicker);
        formLayout.setResponsiveSteps(
                new FormLayout.ResponsiveStep("0", 1), new FormLayout.ResponsiveStep("500px", 2));

        Binder<Event> binder = new Binder<>(Event.class);
        binder.forField(titleField)
                .asRequired("Title is required")
                .bind(Event::getTitle, Event::setTitle);
        binder.forField(descriptionField).bind(Event::getDescription, Event::setDescription);
        binder.forField(startPicker)
                .asRequired("Start date and time is required")
                .bind(Event::getStartDateTime, Event::setStartDateTime);
        binder.forField(endPicker)
                .asRequired("End date and time is required")
                .withValidator(
                        endDate -> endDate.isAfter(startPicker.getValue()),
                        "End date must be after start date")
                .bind(Event::getEndDateTime, Event::setEndDateTime);
        binder.readBean(event);

        Button cancelBtn = new Button("Cancel", e -> dialog.close());

        Button deleteBtn = new Button("Delete", e -> confirmDelete(event, dialog));
        deleteBtn.addThemeVariants(ButtonVariant.LUMO_ERROR);

        Button updateBtn =
                new Button(
                        "Update",
                        e -> {
                            if (binder.writeBeanIfValid(event)) {
                                eventService.save(event);
                                loadUserEvents();
                                Notification.show(
                                                "Event updated",
                                                3000,
                                                Notification.Position.BOTTOM_END)
                                        .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
                                dialog.close();
                            }
                        });
        updateBtn.addThemeName("primary");

        HorizontalLayout rightButtons = new HorizontalLayout(deleteBtn, updateBtn);
        rightButtons.setSpacing(true);

        HorizontalLayout buttonLayout = new HorizontalLayout();
        Style buttonLayoutStyle = buttonLayout.getStyle();

        buttonLayoutStyle.set("display", "flex");
        buttonLayoutStyle.set("width", "100%");
        buttonLayoutStyle.set("align-items", "center");
        buttonLayoutStyle.set("justify-content", "space-between");
        buttonLayoutStyle.set("padding", "20px 0");

        buttonLayout.add(cancelBtn, rightButtons);
        mainLayout.add(formLayout, buttonLayout);
        dialog.add(mainLayout);

        return dialog;
    }

    private void confirmDelete(Event event, Dialog parentDialog) {
        Dialog confirmDialog = new Dialog();
        confirmDialog.setHeaderTitle("Confirm Delete");

        VerticalLayout content = new VerticalLayout();
        content.add("Are you sure you want to delete event: " + event.getTitle() + "?");

        HorizontalLayout buttons = new HorizontalLayout();
        Button cancelButton = new Button("Cancel", e -> confirmDialog.close());
        Button deleteButton =
                new Button(
                        "Delete",
                        e -> {
                            eventService.delete(event);
                            loadUserEvents();
                            confirmDialog.close();
                            parentDialog.close();
                            Notification.show(
                                            "Event deleted", 3000, Notification.Position.BOTTOM_END)
                                    .addThemeVariants(NotificationVariant.LUMO_ERROR);
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

    private void loadUserEvents() {
        if (calendar == null) {
            return;
        }
        var provider = calendar.getEntryProvider().asInMemory();

        for (Entry entry : provider.getEntries().toArray(new Entry[0])) {
            provider.removeEntries(entry);
        }

        UserInfo currentUser = getCurrentUser();
        if (currentUser == null) {
            return;
        }
        List<Event> userEvents = eventService.findEventsByUser(currentUser);
        if (userEvents != null) {
            for (Event event : userEvents) {
                CustomEntry entry = new CustomEntry();
                entry.setEventId(event.getId().toString());
                entry.setTitle(event.getTitle());
                entry.setStart(event.getStartDateTime());
                entry.setEnd(event.getEndDateTime());
                provider.addEntries(entry);
            }
        }
        provider.refreshAll();
    }

    private UserInfo getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null
                && auth.isAuthenticated()
                && !(auth instanceof AnonymousAuthenticationToken)) {
            Object principal = auth.getPrincipal();
            String username;
            if (principal instanceof UserDetails userDetails) {
                username = userDetails.getUsername();
            } else {
                username = principal.toString();
            }
            return userInfoService.findByUsername(username);
        }
        return null;
    }
}
