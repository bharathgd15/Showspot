package com.moviebooking.showspot.service;

import com.moviebooking.showspot.dto.BookingDTO;
import com.moviebooking.showspot.dto.BookingHistoryDTO;
import com.moviebooking.showspot.dto.BookingResponseDTO;
import com.moviebooking.showspot.entity.Booking;
import com.moviebooking.showspot.entity.MovieShow;
import com.moviebooking.showspot.entity.Payment;
import com.moviebooking.showspot.entity.Seat;
import com.moviebooking.showspot.exception.BookingNotFoundException;
import com.moviebooking.showspot.exception.MovieShowNotFoundException;
import com.moviebooking.showspot.exception.SeatAlreadyBookedException;
import com.moviebooking.showspot.exception.SeatNotFoundException;
import com.moviebooking.showspot.repository.BookingRepository;
import com.moviebooking.showspot.repository.MovieShowRepository;
import com.moviebooking.showspot.repository.PaymentRepository;
import com.moviebooking.showspot.repository.SeatRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private MovieShowRepository movieShowRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Transactional
    public BookingResponseDTO bookTicket(
            BookingDTO dto,
            String customerEmail) {

        MovieShow movieShow = movieShowRepository
                .findById(dto.getMovieShowId())
                .orElseThrow(() ->
                        new MovieShowNotFoundException(
                                "Movie Show not found with ID: "
                                        + dto.getMovieShowId()
                        )
                );

        Seat seat = seatRepository
                .findById(dto.getSeatId())
                .orElseThrow(() ->
                        new SeatNotFoundException(
                                "Seat not found with ID: "
                                        + dto.getSeatId()
                        )
                );

        if (seat.getScreen() == null ||
                movieShow.getScreen() == null ||
                seat.getScreen().getId()
                        != movieShow.getScreen().getId()) {

            throw new SeatNotFoundException(
                    "Selected seat does not belong to the screen "
                            + "of the selected movie show"
            );
        }

        boolean alreadyBooked =
                bookingRepository.existsByMovieShowIdAndSeatId(
                        dto.getMovieShowId(),
                        dto.getSeatId()
                );

        if (alreadyBooked) {

            throw new SeatAlreadyBookedException(
                    "Seat "
                            + seat.getSeatNumber()
                            + " is already booked for this movie show"
            );
        }

        Booking booking = new Booking();

        booking.setMovieShow(movieShow);

        booking.setSeat(seat);

        booking.setCustomerName(
                dto.getCustomerName()
        );

        booking.setCustomerEmail(
                customerEmail
        );

        booking.setBookingTime(
                LocalDateTime.now()
        );

        booking.setTotalAmount(
                movieShow.getTicketPrice()
        );

        Booking savedBooking =
                bookingRepository.save(booking);

        return new BookingResponseDTO(
                "Ticket Booked Successfully",
                savedBooking.getId()
        );
    }

    public List<BookingHistoryDTO> getBookingHistory(
            String customerEmail) {

        List<Booking> bookings =
                bookingRepository.findByCustomerEmail(
                        customerEmail
                );

        List<BookingHistoryDTO> history =
                new ArrayList<>();

        for (Booking booking : bookings) {

            Payment payment =
                    paymentRepository.findByBookingId(
                            booking.getId()
                    );

            String paymentMethod = "Not Paid";

            String transactionId = "N/A";

            String paymentStatus = "PENDING";

            if (payment != null) {

                paymentMethod =
                        payment.getPaymentMethod();

                transactionId =
                        payment.getTransactionId();

                paymentStatus =
                        payment.getPaymentStatus();
            }

            BookingHistoryDTO dto =
                    new BookingHistoryDTO(

                            booking.getId(),

                            booking.getMovieShow()
                                    .getMovie()
                                    .getTitle(),

                            booking.getSeat()
                                    .getSeatNumber(),

                            booking.getMovieShow()
                                    .getShowDate()
                                    .toString(),

                            booking.getMovieShow()
                                    .getShowTime()
                                    .toString(),

                            booking.getTotalAmount(),

                            booking.getCustomerName(),

                            booking.getBookingTime(),

                            paymentMethod,

                            transactionId,

                            paymentStatus
                    );

            history.add(dto);
        }

        return history;
    }

    @Transactional
    public String cancelTicket(
            int bookingId,
            String customerEmail) {

        Booking booking = bookingRepository
                .findById(bookingId)
                .orElseThrow(() ->
                        new BookingNotFoundException(
                                "Booking not found with ID: "
                                        + bookingId
                        )
                );

        if (!booking.getCustomerEmail()
                .equals(customerEmail)) {

            throw new BookingNotFoundException(
                    "Booking not found for the current user"
            );
        }

        Payment payment =
                paymentRepository.findByBookingId(
                        bookingId
                );

        if (payment != null) {

            paymentRepository.delete(payment);
        }

        bookingRepository.delete(booking);

        return "Ticket Cancelled Successfully";
    }
}