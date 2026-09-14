package com.moviebooking.showspot.controller;

import com.moviebooking.showspot.dto.BookingDTO;
import com.moviebooking.showspot.dto.BookingHistoryDTO;
import com.moviebooking.showspot.dto.BookingResponseDTO;
import com.moviebooking.showspot.service.BookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/book")
    public BookingResponseDTO bookTicket(
            @RequestBody BookingDTO dto,
            Authentication authentication) {

        String customerEmail =
                authentication.getName();

        return bookingService.bookTicket(
                dto,
                customerEmail
        );
    }

    @GetMapping("/history")
    public List<BookingHistoryDTO> getBookingHistory(
            Authentication authentication) {

        String customerEmail =
                authentication.getName();

        return bookingService.getBookingHistory(
                customerEmail
        );
    }

    @DeleteMapping("/cancel/{bookingId}")
    public String cancelTicket(
            @PathVariable int bookingId,
            Authentication authentication) {

        String customerEmail =
                authentication.getName();

        return bookingService.cancelTicket(
                bookingId,
                customerEmail
        );
    }
}