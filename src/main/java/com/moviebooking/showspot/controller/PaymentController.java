package com.moviebooking.showspot.controller;

import com.moviebooking.showspot.dto.PaymentDTO;
import com.moviebooking.showspot.entity.Payment;
import com.moviebooking.showspot.service.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // ==========================================
    // TEST PAYMENT CONTROLLER
    // ==========================================

    @GetMapping("/test")
    public String test() {

        return "Payment Controller Working";
    }

    // ==========================================
    // MAKE PAYMENT
    // ==========================================

    @PostMapping("/pay")
    public String makePayment(
            @RequestBody PaymentDTO dto,
            Authentication authentication) {

        System.out.println("================================");
        System.out.println("PAYMENT API CALLED");
        System.out.println("Booking ID = " + dto.getBookingId());
        System.out.println("Payment Method = "
                + dto.getPaymentMethod());
        System.out.println("Logged-in User = "
                + authentication.getName());
        System.out.println("================================");

        // Get email from JWT authenticated user
        String customerEmail = authentication.getName();

        return paymentService.makePayment(
                dto,
                customerEmail
        );
    }

    // ==========================================
    // GET PAYMENT BY ID
    // ==========================================

    @GetMapping("/{id}")
    public Payment getPaymentById(
            @PathVariable int id,
            Authentication authentication) {

        // Get email from JWT authenticated user
        String customerEmail = authentication.getName();

        return paymentService.getPaymentById(
                id,
                customerEmail
        );
    }
}