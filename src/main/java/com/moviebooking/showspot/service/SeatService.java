package com.moviebooking.showspot.service;

import com.moviebooking.showspot.dto.SeatResponseDTO;
import com.moviebooking.showspot.entity.MovieShow;
import com.moviebooking.showspot.entity.Screen;
import com.moviebooking.showspot.entity.Seat;
import com.moviebooking.showspot.repository.BookingRepository;
import com.moviebooking.showspot.repository.MovieShowRepository;
import com.moviebooking.showspot.repository.ScreenRepository;
import com.moviebooking.showspot.repository.SeatRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private ScreenRepository screenRepository;

    @Autowired
    private MovieShowRepository movieShowRepository;

    @Autowired
    private BookingRepository bookingRepository;

    // ==========================================
    // GENERATE SEATS
    // ==========================================

    public String generateSeats(int screenId) {

        Screen screen =
                screenRepository.findById(screenId)
                        .orElse(null);

        if (screen == null) {
            return "Screen Not Found";
        }

        if (!seatRepository.findByScreen(screen).isEmpty()) {
            return "Seats Already Generated";
        }

        char row = 'A';

        for (int i = 1;
             i <= screen.getCapacity();
             i++) {

            Seat seat = new Seat();

            seat.setSeatNumber(
                    row + String.valueOf(i)
            );

            seat.setBooked(false);

            seat.setScreen(screen);

            seatRepository.save(seat);

            if (i % 10 == 0) {
                row++;
            }
        }

        return "Seats Generated Successfully";
    }

    // ==========================================
    // GET SEATS BY SCREEN
    // ==========================================

    public List<SeatResponseDTO> getSeatsByScreen(
            int screenId) {

        Screen screen =
                screenRepository.findById(screenId)
                        .orElse(null);

        if (screen == null) {
            return new ArrayList<>();
        }

        List<Seat> seats =
                seatRepository.findByScreen(screen);

        List<SeatResponseDTO> response =
                new ArrayList<>();

        for (Seat seat : seats) {

            SeatResponseDTO dto =
                    new SeatResponseDTO();

            // IMPORTANT
            dto.setId(seat.getId());

            dto.setSeatNumber(
                    seat.getSeatNumber()
            );

            dto.setBooked(false);

            response.add(dto);
        }

        return response;
    }

    // ==========================================
    // GET SEATS BY MOVIE SHOW
    // ==========================================

    public List<SeatResponseDTO> getSeatsByMovieShow(
            int movieShowId) {

        MovieShow movieShow =
                movieShowRepository.findById(movieShowId)
                        .orElse(null);

        if (movieShow == null) {
            return new ArrayList<>();
        }

        Screen screen =
                movieShow.getScreen();

        if (screen == null) {
            return new ArrayList<>();
        }

        List<Seat> seats =
                seatRepository.findByScreen(screen);

        List<SeatResponseDTO> response =
                new ArrayList<>();

        for (Seat seat : seats) {

            SeatResponseDTO dto =
                    new SeatResponseDTO();

            // IMPORTANT
            // Send database seat ID to React
            dto.setId(seat.getId());

            dto.setSeatNumber(
                    seat.getSeatNumber()
            );

            boolean booked =
                    bookingRepository
                            .existsByMovieShowIdAndSeatId(
                                    movieShowId,
                                    seat.getId()
                            );

            dto.setBooked(booked);

            response.add(dto);
        }

        return response;
    }
}