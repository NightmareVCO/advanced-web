package com.icc.web.model;

import elemental.json.JsonObject;
import org.vaadin.stefan.fullcalendar.Entry;

public class CustomEntry extends Entry {
    private String eventId;

    public CustomEntry() {
        super();
    }

    public CustomEntry(String id) {
        super();
        this.eventId = id;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    @Override
    public void updateFromJson(JsonObject json) {
        json.put("id", this.getId());
        super.updateFromJson(json);
    }

    @Override
    public Entry copy() {
        CustomEntry copy = new CustomEntry();
        copy.setEventId(this.eventId);
        copy.setTitle(this.getTitle());
        copy.setStart(this.getStart());
        copy.setEnd(this.getEnd());
        copy.setAllDay(this.isAllDay());
        return copy;
    }
}
