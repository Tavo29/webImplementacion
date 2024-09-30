package com.eia.dwarf_drag_event.repositories;

import com.eia.dwarf_drag_event.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
}
