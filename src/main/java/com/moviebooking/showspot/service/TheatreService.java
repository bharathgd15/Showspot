package com.moviebooking.showspot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moviebooking.showspot.entity.Theatre;
import com.moviebooking.showspot.repository.TheatreRepository;

@Service
public class TheatreService {

    @Autowired
    private TheatreRepository theatreRepository;

    // Save Theatre
    public Theatre saveTheatre(Theatre theatre) {
        return theatreRepository.save(theatre);
    }

    // Get All Theatres
    public List<Theatre> getAllTheatres() {
        return theatreRepository.findAll();
    }

    // Get Theatre By ID
    public Theatre getTheatreById(int id) {
        return theatreRepository.findById(id).orElse(null);
    }

    // Update Theatre
    public Theatre updateTheatre(Theatre theatre) {
        return theatreRepository.save(theatre);
    }

    // Delete Theatre
    public String deleteTheatre(int id) {

        if (theatreRepository.existsById(id)) {
            theatreRepository.deleteById(id);
            return "Theatre Deleted Successfully";
        }

        return "Theatre Not Found";
    }
}