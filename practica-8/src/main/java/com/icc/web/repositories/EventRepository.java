package com.icc.web.repositories;

import com.icc.web.model.Event;
import com.icc.web.model.UserInfo;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByUser(UserInfo user);

    List<Event> findByStartDateTimeBetween(LocalDateTime start, LocalDateTime end);
}
