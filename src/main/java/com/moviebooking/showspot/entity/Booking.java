package com.moviebooking.showspot.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "movie_show_id")
    private MovieShow movieShow;

    @ManyToOne
    @JoinColumn(name = "seat_id")
    private Seat seat;

    private String customerName;

    private String customerEmail;

    private LocalDateTime bookingTime;

    private double totalAmount;

    public Booking() {
    }

    public Booking(int id, MovieShow movieShow, Seat seat, String customerName,
                   String customerEmail, LocalDateTime bookingTime, double totalAmount) {
        this.id = id;
        this.movieShow = movieShow;
        this.seat = seat;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.bookingTime = bookingTime;
        this.totalAmount = totalAmount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public MovieShow getMovieShow() {
        return movieShow;
    }

    public void setMovieShow(MovieShow movieShow) {
        this.movieShow = movieShow;
    }

    public Seat getSeat() {
        return seat;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
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

    public LocalDateTime getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(LocalDateTime bookingTime) {
        this.bookingTime = bookingTime;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
}