package com.moviebooking.showspot.service;

import com.moviebooking.showspot.dto.MovieShowDTO;
import com.moviebooking.showspot.entity.Movie;
import com.moviebooking.showspot.entity.MovieShow;
import com.moviebooking.showspot.entity.Screen;
import com.moviebooking.showspot.repository.MovieRepository;
import com.moviebooking.showspot.repository.MovieShowRepository;
import com.moviebooking.showspot.repository.ScreenRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieShowService {

    @Autowired
    private MovieShowRepository movieShowRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ScreenRepository screenRepository;


    // ==========================================
    // ADD MOVIE SHOW
    // ==========================================

    public String addShow(MovieShowDTO dto) {

        // 1. Find Movie
        Movie movie =
                movieRepository.findById(dto.getMovieId())
                        .orElse(null);

        if (movie == null) {
            return "Movie not found";
        }

        // 2. Find Screen
        Screen screen =
                screenRepository.findById(dto.getScreenId())
                        .orElse(null);

        if (screen == null) {
            return "Screen not found";
        }

        // 3. Check whether the screen is already
        // occupied at the same date and time
        boolean showExists =
                movieShowRepository
                        .existsByScreenIdAndShowDateAndShowTime(
                                dto.getScreenId(),
                                dto.getShowDate(),
                                dto.getShowTime()
                        );

        if (showExists) {
            return "A Movie Show already exists on this screen at the selected date and time";
        }

        // 4. Create MovieShow
        MovieShow movieShow = new MovieShow();

        movieShow.setMovie(movie);
        movieShow.setScreen(screen);
        movieShow.setShowDate(dto.getShowDate());
        movieShow.setShowTime(dto.getShowTime());
        movieShow.setTicketPrice(dto.getTicketPrice());

        // 5. Save MovieShow
        movieShowRepository.save(movieShow);

        return "Movie Show Added Successfully";
    }


    // ==========================================
    // GET ALL MOVIE SHOWS
    // ==========================================

    public List<MovieShow> getAllShows() {

        return movieShowRepository.findAll();
    }


    // ==========================================
    // GET MOVIE SHOW BY ID
    // ==========================================

    public MovieShow getShowById(int id) {

        return movieShowRepository
                .findById(id)
                .orElse(null);
    }
}