package com.icc.web.services;

import com.icc.web.model.Event;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduledTaskService {

    private final EventService eventService;
    private final EmailService emailService;

    @Scheduled(fixedRate = 300000)
    public void sendUpcomingEventReminders() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime tenMinutesFromNow = now.plusMinutes(10);

        List<Event> upcomingEvents = eventService.findEventsBetween(now, tenMinutesFromNow);

        for (Event event : upcomingEvents) {
            if (event.getStartDateTime().isAfter(now)
                    && !event.getStartDateTime().isBefore(tenMinutesFromNow)) {
                continue;
            }

            log.info(
                    "Sending reminder for event: {} at {}",
                    event.getTitle(),
                    event.getStartDateTime());
            emailService.sendEventReminderEmail(event);
        }
    }
}
