package com.moviebooking.showspot.repository;

import com.moviebooking.showspot.entity.MovieShow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public interface MovieShowRepository
        extends JpaRepository<MovieShow, Integer> {

    // Check whether a screen already has a show
    // at the same date and time
    boolean existsByScreenIdAndShowDateAndShowTime(
            int screenId,
            LocalDate showDate,
            LocalTime showTime
    );
}