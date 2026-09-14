package com.moviebooking.showspot.service;

import com.moviebooking.showspot.dto.PaymentDTO;
import com.moviebooking.showspot.entity.Booking;
import com.moviebooking.showspot.entity.Payment;
import com.moviebooking.showspot.exception.BookingNotFoundException;
import com.moviebooking.showspot.exception.PaymentAlreadyCompletedException;
import com.moviebooking.showspot.repository.BookingRepository;
import com.moviebooking.showspot.repository.PaymentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EmailService emailService;

    // ==========================================
    // MAKE PAYMENT
    // ==========================================

    @Transactional
    public String makePayment(
            PaymentDTO dto,
            String customerEmail) {

        // 1. Find Booking
        Booking booking = bookingRepository
                .findById(dto.getBookingId())
                .orElseThrow(() ->
                        new BookingNotFoundException(
                                "Booking not found with ID: "
                                        + dto.getBookingId()
                        )
                );

        // 2. Verify that the booking belongs
        // to the logged-in user
        if (!booking.getCustomerEmail()
                .equals(customerEmail)) {

            throw new BookingNotFoundException(
                    "Booking not found for the current user"
            );
        }

        // 3. Check whether payment already exists
        Payment existingPayment =
                paymentRepository.findByBookingId(
                        dto.getBookingId()
                );

        if (existingPayment != null) {

            throw new PaymentAlreadyCompletedException(
                    "Payment already completed for Booking ID: "
                            + dto.getBookingId()
            );
        }

        // 4. Create new Payment
        Payment payment = new Payment();

        // Connect payment with booking
        payment.setBooking(booking);

        // IMPORTANT:
        // Amount comes from the booking.
        // User cannot change the amount from Postman.
        payment.setAmount(
                booking.getTotalAmount()
        );

        // Payment method comes from request
        payment.setPaymentMethod(
                dto.getPaymentMethod()
        );

        // For our project, payment is successful
        payment.setPaymentStatus("SUCCESS");

        // Generate unique transaction ID
        payment.setTransactionId(
                UUID.randomUUID().toString()
        );

        // Current date and time
        payment.setPaymentTime(
                LocalDateTime.now()
        );

        // 5. Save Payment
        paymentRepository.save(payment);

        // 6. Send booking confirmation email
        emailService.sendBookingConfirmation(payment);

        // 7. Return response
        return "Payment Successful";
    }

    // ==========================================
    // GET PAYMENT BY ID
    // ==========================================

    public Payment getPaymentById(
            int id,
            String customerEmail) {

        // 1. Find Payment
        Payment payment = paymentRepository
                .findById(id)
                .orElse(null);

        // 2. If payment doesn't exist
        if (payment == null) {
            return null;
        }

        // 3. Get associated booking
        Booking booking = payment.getBooking();

        // 4. Verify ownership
        if (booking == null ||
                !booking.getCustomerEmail()
                        .equals(customerEmail)) {

            return null;
        }

        // 5. Return payment
        return payment;
    }
}