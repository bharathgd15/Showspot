package com.moviebooking.showspot.service;

import com.moviebooking.showspot.entity.MovieShow;
import com.moviebooking.showspot.entity.Seat;
import com.moviebooking.showspot.entity.ShowSeat;
import com.moviebooking.showspot.exception.MovieShowNotFoundException;
import com.moviebooking.showspot.repository.MovieShowRepository;
import com.moviebooking.showspot.repository.SeatRepository;
import com.moviebooking.showspot.repository.ShowSeatRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShowSeatService {

    private final ShowSeatRepository showSeatRepository;
    private final MovieShowRepository movieShowRepository;
    private final SeatRepository seatRepository;

    public ShowSeatService(
            ShowSeatRepository showSeatRepository,
            MovieShowRepository movieShowRepository,
            SeatRepository seatRepository
    ) {
        this.showSeatRepository = showSeatRepository;
        this.movieShowRepository = movieShowRepository;
        this.seatRepository = seatRepository;
    }

    // Create seat status for every seat when a movie show is created
    public void createShowSeats(Integer movieShowId) {

        MovieShow movieShow = movieShowRepository
                .findById(movieShowId)
                .orElseThrow(() ->
                        new MovieShowNotFoundException("Movie show not found")
                );

        List<Seat> seats =
                seatRepository.findByScreen(movieShow.getScreen());

        for (Seat seat : seats) {

            ShowSeat showSeat =
                    new ShowSeat(movieShow, seat);

            showSeatRepository.save(showSeat);
        }
    }

    // Get all seats for a particular movie show
    public List<ShowSeat> getShowSeats(Integer movieShowId) {

        MovieShow movieShow = movieShowRepository
                .findById(movieShowId)
                .orElseThrow(() ->
                        new MovieShowNotFoundException("Movie show not found")
                );

        return showSeatRepository.findByMovieShow(movieShow);
    }

    // Get available seats for a movie show
    public List<ShowSeat> getAvailableSeats(Integer movieShowId) {

        MovieShow movieShow = movieShowRepository
                .findById(movieShowId)
                .orElseThrow(() ->
                        new MovieShowNotFoundException("Movie show not found")
                );

        return showSeatRepository
                .findByMovieShowAndBookedFalse(movieShow);
    }
}