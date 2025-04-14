package com.icc.web.views.components;

import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.dom.Style;

public class Footer extends Composite<HorizontalLayout> {
    public Footer() {
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
        Div authorSection = authorSection();

        layout.add(brandSection, authorSection);
        layout.setAlignSelf(FlexComponent.Alignment.CENTER, brandSection);
        layout.setAlignSelf(FlexComponent.Alignment.CENTER, authorSection);
    }

    private Div brandSection() {
        Div brandContainer = new Div();

        Image brandLogo = new Image("/images/chronoguard_white.svg", "Chrono Guard Logo");
        brandLogo.setWidth("150px");
        brandContainer.add(brandLogo);

        return brandContainer;
    }

    private Div authorSection() {
        Div authorsContainer = new Div();

        Paragraph authorsName = new Paragraph();
        authorsName.setText("©2025 Vladimir Curiel & Steven Mateo");
        authorsName.setWidth("max-content");
        authorsName.getStyle().set("color", "var(--white)");
        authorsName.getStyle().set("font-size", "var(--lumo-font-size-s)");
        authorsContainer.add(authorsName);

        return authorsContainer;
    }
}
