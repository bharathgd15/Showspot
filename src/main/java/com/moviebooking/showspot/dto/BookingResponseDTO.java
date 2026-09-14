package com.moviebooking.showspot.dto;

public class BookingResponseDTO {

    private String message;
    private int bookingId;

    public BookingResponseDTO() {
    }

    public BookingResponseDTO(String message, int bookingId) {
        this.message = message;
        this.bookingId = bookingId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }
}