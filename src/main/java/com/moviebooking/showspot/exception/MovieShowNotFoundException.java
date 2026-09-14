package com.moviebooking.showspot.exception;

public class MovieShowNotFoundException extends RuntimeException {

    public MovieShowNotFoundException(String message) {
        super(message);
    }
}