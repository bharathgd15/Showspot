package com.moviebooking.showspot.dto;

public class SeatResponseDTO {

    private int id;
    private String seatNumber;
    private boolean booked;

    public SeatResponseDTO() {
    }

    public SeatResponseDTO(
            int id,
            String seatNumber,
            boolean booked) {

        this.id = id;
        this.seatNumber = seatNumber;
        this.booked = booked;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public boolean isBooked() {
        return booked;
    }

    public void setBooked(boolean booked) {
        this.booked = booked;
    }
}