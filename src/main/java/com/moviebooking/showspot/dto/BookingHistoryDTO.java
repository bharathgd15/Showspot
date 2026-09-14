package com.moviebooking.showspot.dto;

import java.time.LocalDateTime;

public class BookingHistoryDTO {

    private int bookingId;

    private String movieTitle;

    private String seatNumber;

    private String showDate;

    private String showTime;

    private double amount;

    private String customerName;

    private LocalDateTime bookingTime;

    private String paymentMethod;

    private String transactionId;

    private String paymentStatus;

    public BookingHistoryDTO() {
    }

    public BookingHistoryDTO(
            int bookingId,
            String movieTitle,
            String seatNumber,
            String showDate,
            String showTime,
            double amount,
            String customerName,
            LocalDateTime bookingTime,
            String paymentMethod,
            String transactionId,
            String paymentStatus) {

        this.bookingId = bookingId;
        this.movieTitle = movieTitle;
        this.seatNumber = seatNumber;
        this.showDate = showDate;
        this.showTime = showTime;
        this.amount = amount;
        this.customerName = customerName;
        this.bookingTime = bookingTime;
        this.paymentMethod = paymentMethod;
        this.transactionId = transactionId;
        this.paymentStatus = paymentStatus;
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public String getShowDate() {
        return showDate;
    }

    public void setShowDate(String showDate) {
        this.showDate = showDate;
    }

    public String getShowTime() {
        return showTime;
    }

    public void setShowTime(String showTime) {
        this.showTime = showTime;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public LocalDateTime getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(LocalDateTime bookingTime) {
        this.bookingTime = bookingTime;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}