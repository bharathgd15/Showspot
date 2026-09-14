package com.moviebooking.showspot.exception;

public class PaymentAlreadyCompletedException extends RuntimeException {

    public PaymentAlreadyCompletedException(String message) {
        super(message);
    }
}