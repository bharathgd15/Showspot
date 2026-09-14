package com.moviebooking.showspot.dto;

public class BookingDTO {

    private int movieShowId;
    private int seatId;
    private String customerName;
    private String customerEmail;

    public BookingDTO() {
    }

    public int getMovieShowId() {
        return movieShowId;
    }

    public void setMovieShowId(int movieShowId) {
        this.movieShowId = movieShowId;
    }

    public int getSeatId() {
        return seatId;
    }

    public void setSeatId(int seatId) {
        this.seatId = seatId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }
}