package com.moviebooking.showspot.controller;

import com.moviebooking.showspot.dto.SeatDTO;
import com.moviebooking.showspot.dto.SeatResponseDTO;
import com.moviebooking.showspot.service.SeatService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seat")
public class SeatController {

    @Autowired
    private SeatService seatService;

    // ==========================================
    // GENERATE SEATS FOR A SCREEN
    // ==========================================

    @PostMapping("/generate")
    public String generateSeats(
            @RequestBody SeatDTO dto) {

        return seatService.generateSeats(
                dto.getScreenId()
        );
    }

    // ==========================================
    // GET ALL SEATS OF A SCREEN
    // ==========================================

    @GetMapping("/screen/{screenId}")
    public List<SeatResponseDTO> getSeats(
            @PathVariable int screenId) {

        return seatService.getSeatsByScreen(
                screenId
        );
    }

    // ==========================================
    // GET SEATS FOR A PARTICULAR MOVIE SHOW
    // ==========================================

    @GetMapping("/show/{movieShowId}")
    public List<SeatResponseDTO> getSeatsByMovieShow(
            @PathVariable int movieShowId) {

        return seatService.getSeatsByMovieShow(
                movieShowId
        );
    }
}