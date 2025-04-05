package com.icc.web.views.components;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.server.StreamResource;

@Tag("app-title")
public class AppTitle extends Div {
    public AppTitle(String size) {
        Div container = new Div();
        container.getStyle()
                .set("display", "flex")
                .set("align-items", "center")
                .set("justify-content", "center");

        var title = new Span("Chrono");
        title.getStyle()
                .set("color", "#419d78")
                .set("font-size", size)
                .set("font-weight", "bold")
                .setMargin("0");
        var title2 = new Span("Guard");
        title2.getStyle()
                .set("color", "#2d3047")
                .set("font-size", size)
                .set("font-weight", "bold")
                .setMargin("0");

        StreamResource logoResource = new StreamResource("logo.svg",
                () -> getClass().getResourceAsStream("/static/logo.svg"));
        Image logo = new Image(logoResource, "Logo");
        int sizeFixed = Integer.parseInt(size.replaceAll("[^0-9]", ""))+15; // Making the logo bigger
        logo.setWidth(sizeFixed+"px");
        logo.setHeight(sizeFixed+"px");

        container.add(new Div(title, title2), logo);
        container.addClickListener(event -> UI.getCurrent().navigate("/"));
        container.getStyle().set("cursor", "pointer");
        add(container);
        getStyle()
                .set("padding", "10px")
                .set("display", "inline-block")
                .set("border-radius", "5px")
                .setBackgroundColor("#e8ebf7");

    }
}