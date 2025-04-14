package com.icc.web.services;

import com.icc.web.model.Event;
import com.icc.web.model.UserInfo;
import com.icc.web.repositories.EventRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event save(Event event) {
        return eventRepository.save(event);
    }

    public Event delete(Event event) {
        eventRepository.delete(event);
        return event;
    }

    public Optional<Event> findById(Long id) {
        return eventRepository.findById(id);
    }

    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    public void deleteById(Long id) {
        eventRepository.deleteById(id);
    }

    public List<Event> findEventsByUser(UserInfo user) {
        return eventRepository.findByUser(user);
    }

    @Transactional
    public List<Event> findEventsBetween(LocalDateTime from, LocalDateTime to) {
        List<Event> events = eventRepository.findByStartDateTimeBetween(from, to);

        events.forEach(event -> event.getUser().getName());

        return events;
    }
}
