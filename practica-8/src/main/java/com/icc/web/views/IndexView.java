package com.icc.web.views;

import com.icc.web.views.components.Footer;
import com.icc.web.views.components.Navbar;
import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.dom.Style;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import jakarta.annotation.security.PermitAll;

@Route("")
@PermitAll
@AnonymousAllowed
@PageTitle("Home | Chrono Guard")
public class IndexView extends Composite<VerticalLayout> {
    public IndexView() {
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
        pageContainer.getStyle().set("display", "flex");
        pageContainer.getStyle().set("flex-grow", "1");
        pageContainer.getStyle().set("align-items", "center");
        pageContainer.getStyle().set("justify-content", "space-between");

        VerticalLayout productExplanationContainer = new VerticalLayout();
        VerticalLayout productImageContainer = new VerticalLayout();

        Image brandImage = new Image("/images/chronoguard.svg", "Chrono Guard");
        brandImage.setWidth("350px");

        Paragraph description = new Paragraph();
        description
                .getElement()
                .setProperty(
                        "innerHTML",
                        "Easily manage meetings and appointments with our powerful scheduling"
                            + " platform for managers. Designed with a modern, intuitive interface"
                            + " inspired by Google Calendar, it allows you to view and organize"
                            + " events quickly and efficiently. Each created or updated event"
                            + " automatically sends an email notification to the assigned manager,"
                            + " ensuring nothing is ever missed.<br><br>Built with robust"
                            + " technologies like Vaadin and Spring Boot, the application delivers"
                            + " smooth performance and a seamless user experience. It features"
                            + " secure access control, user management, personalized settings, and"
                            + " the ability to drag and drop events directly on the calendar. Fully"
                            + " containerized with Docker, it’s ready for deployment in any"
                            + " enterprise environment.");
        description.getStyle().set("width", "850px");
        description.getStyle().set("font-size", "var(--lumo-font-size-m)");
        description.getStyle().set("color", "var(--lumo-secondary-text-color)");

        Image productImage = new Image("/images/calendar.svg", "Chrono Guard Product");
        productImage.setWidth("650px");

        productExplanationContainer.add(brandImage, description);
        productExplanationContainer.getStyle().set("display", "flex");
        productExplanationContainer.getStyle().set("flex-direction", "column");
        productExplanationContainer.getStyle().set("align-items", "center");
        productExplanationContainer.getStyle().set("justify-content", "center");
        productExplanationContainer.getStyle().set("gap", "20px");

        productImageContainer.add(productImage);
        productImageContainer.getStyle().set("display", "flex");
        productImageContainer.getStyle().set("align-items", "start");
        productImageContainer.getStyle().set("justify-content", "center");

        pageContainer.add(productExplanationContainer, productImage);

        return pageContainer;
    }
}
