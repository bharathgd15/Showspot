package com.moviebooking.showspot.repository;

import com.moviebooking.showspot.entity.MovieShow;
import com.moviebooking.showspot.entity.Seat;
import com.moviebooking.showspot.entity.ShowSeat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ShowSeatRepository extends JpaRepository<ShowSeat, Long> {

    List<ShowSeat> findByMovieShow(MovieShow movieShow);

    Optional<ShowSeat> findByMovieShowAndSeat(
            MovieShow movieShow,
            Seat seat
    );

    List<ShowSeat> findByMovieShowAndBookedFalse(MovieShow movieShow);
}