package com.moviebooking.showspot.service;

import com.moviebooking.showspot.entity.Booking;
import com.moviebooking.showspot.entity.Payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    public void sendBookingConfirmation(Payment payment) {

        Booking booking = payment.getBooking();

        String to = booking.getCustomerEmail();

        String subject =
                "ShowSpot Ticket Confirmation";

        String body =
                "Hello "
                        + booking.getCustomerName()
                        + ",\n\n"

                        + "Your movie ticket has been confirmed successfully."
                        + "\n\n"

                        + "Movie : "
                        + booking.getMovieShow()
                        .getMovie()
                        .getTitle()
                        + "\n"

                        + "Theatre : "
                        + booking.getMovieShow()
                        .getScreen()
                        .getTheatre()
                        .getTheatreName()
                        + "\n"

                        + "Screen : "
                        + booking.getMovieShow()
                        .getScreen()
                        .getScreenName()
                        + "\n"

                        + "Seat : "
                        + booking.getSeat()
                        .getSeatNumber()
                        + "\n"

                        + "Date : "
                        + booking.getMovieShow()
                        .getShowDate()
                        + "\n"

                        + "Time : "
                        + booking.getMovieShow()
                        .getShowTime()
                        + "\n\n"

                        + "Amount Paid : ₹"
                        + payment.getAmount()
                        + "\n"

                        + "Payment Method : "
                        + payment.getPaymentMethod()
                        + "\n"

                        + "Payment Status : "
                        + payment.getPaymentStatus()
                        + "\n"

                        + "Transaction ID : "
                        + payment.getTransactionId()
                        + "\n\n"

                        + "Thank you for choosing ShowSpot."
                        + "\n"
                        + "Enjoy your movie!";

        SimpleMailMessage message =
                new SimpleMailMessage();

        // IMPORTANT: explicitly set sender
        message.setFrom(senderEmail);

        message.setTo(to);

        message.setSubject(subject);

        message.setText(body);

        System.out.println(
                "======================================"
        );

        System.out.println(
                "SENDING BOOKING CONFIRMATION EMAIL"
        );

        System.out.println(
                "FROM : " + senderEmail
        );

        System.out.println(
                "TO   : " + to
        );

        System.out.println(
                "SUBJECT : " + subject
        );

        System.out.println(
                "======================================"
        );

        mailSender.send(message);

        System.out.println(
                "EMAIL SENT SUCCESSFULLY"
        );

        System.out.println(
                "======================================"
        );
    }
}