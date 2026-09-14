package com.moviebooking.showspot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moviebooking.showspot.entity.Movie;
import com.moviebooking.showspot.repository.MovieRepository;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    // Save Movie
    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    // Get All Movies
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    // Get Movie By ID
    public Movie getMovieById(int id) {
        return movieRepository.findById(id).orElse(null);
    }

    // Update Movie
    public Movie updateMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    // Delete Movie
    public String deleteMovie(int id) {
        movieRepository.deleteById(id);
        return "Movie Deleted Successfully";
    }

}