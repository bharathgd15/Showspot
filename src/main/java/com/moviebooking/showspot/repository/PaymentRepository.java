package com.moviebooking.showspot.repository;

import com.moviebooking.showspot.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    Payment findByBookingId(int bookingId);

}