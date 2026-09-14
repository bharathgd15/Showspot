package com.moviebooking.showspot.controller;

import com.moviebooking.showspot.dto.MovieShowDTO;
import com.moviebooking.showspot.entity.MovieShow;
import com.moviebooking.showspot.service.MovieShowService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movie-show")
public class MovieShowController {

    @Autowired
    private MovieShowService movieShowService;


    // ==========================================
    // ADD MOVIE SHOW
    // ==========================================

    @PostMapping("/add")
    public String addMovieShow(@RequestBody MovieShowDTO dto) {

        return movieShowService.addShow(dto);
    }


    // ==========================================
    // GET ALL MOVIE SHOWS
    // ==========================================

    @GetMapping("/getAll")
    public List<MovieShow> getAllShows() {

        return movieShowService.getAllShows();
    }


    // ==========================================
    // GET MOVIE SHOW BY ID
    // ==========================================

    @GetMapping("/get/{id}")
    public MovieShow getShowById(@PathVariable int id) {

        return movieShowService.getShowById(id);
    }
}