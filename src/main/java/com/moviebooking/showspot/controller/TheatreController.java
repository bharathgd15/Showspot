package com.moviebooking.showspot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.moviebooking.showspot.entity.Theatre;
import com.moviebooking.showspot.service.TheatreService;

@RestController
@RequestMapping("/theatre")
public class TheatreController {

    @Autowired
    private TheatreService theatreService;

    // Save Theatre
    @PostMapping("/save")
    public Theatre saveTheatre(@RequestBody Theatre theatre) {
        return theatreService.saveTheatre(theatre);
    }

    // Get All Theatres
    @GetMapping("/getAll")
    public List<Theatre> getAllTheatres() {
        return theatreService.getAllTheatres();
    }

    // Get Theatre By ID
    @GetMapping("/get/{id}")
    public Theatre getTheatreById(@PathVariable int id) {
        return theatreService.getTheatreById(id);
    }

    // Update Theatre
    @PutMapping("/update")
    public Theatre updateTheatre(@RequestBody Theatre theatre) {
        return theatreService.updateTheatre(theatre);
    }

    // Delete Theatre
    @DeleteMapping("/delete/{id}")
    public String deleteTheatre(@PathVariable int id) {
        return theatreService.deleteTheatre(id);
    }
}