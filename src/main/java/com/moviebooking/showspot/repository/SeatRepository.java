package com.moviebooking.showspot.repository;

import com.moviebooking.showspot.entity.Screen;
import com.moviebooking.showspot.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer> {

    List<Seat> findByScreen(Screen screen);

}