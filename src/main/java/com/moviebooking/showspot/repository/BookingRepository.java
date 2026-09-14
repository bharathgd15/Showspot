package com.moviebooking.showspot.repository;

import com.moviebooking.showspot.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    // Get all bookings of a customer
    List<Booking> findByCustomerEmail(String customerEmail);

    // Check whether a particular seat is already booked
    // for a particular movie show
    boolean existsByMovieShowIdAndSeatId(
            int movieShowId,
            int seatId
    );
}