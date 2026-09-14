package com.moviebooking.showspot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.moviebooking.showspot.entity.Movie;
import com.moviebooking.showspot.service.MovieService;

@RestController
@RequestMapping("/movie")
public class MovieController {

    @Autowired
    private MovieService movieService;

    // Save Movie
    @PostMapping("/save")
    public Movie saveMovie(@RequestBody Movie movie) {

        System.out.println("========== REQUEST RECEIVED ==========");
        System.out.println("Title      : " + movie.getTitle());
        System.out.println("Genre      : " + movie.getGenre());
        System.out.println("Language   : " + movie.getLanguage());
        System.out.println("Duration   : " + movie.getDuration());
        System.out.println("Rating     : " + movie.getRating());
        System.out.println("======================================");

        Movie savedMovie = movieService.saveMovie(movie);

        System.out.println("Movie Saved Successfully!");

        return savedMovie;
    }

    // Get All Movies
    @GetMapping("/getAll")
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    // Get Movie By ID
    @GetMapping("/get/{id}")
    public Movie getMovieById(@PathVariable int id) {
        return movieService.getMovieById(id);
    }

    // Update Movie
    @PutMapping("/update")
    public Movie updateMovie(@RequestBody Movie movie) {
        return movieService.updateMovie(movie);
    }

    // Delete Movie
    @DeleteMapping("/delete/{id}")
    public String deleteMovie(@PathVariable int id) {
        return movieService.deleteMovie(id);
    }
}