package com.moviebooking.showspot.dto;

public class LoginResponseDTO {

    private String message;
    private String token;
    private String fullName;
    private String email;
    private String role;

    // Default constructor
    public LoginResponseDTO() {
    }

    // Parameterized constructor
    public LoginResponseDTO(
            String message,
            String token,
            String fullName,
            String email,
            String role) {

        this.message = message;
        this.token = token;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
    }

    // Getter for message
    public String getMessage() {
        return message;
    }

    // Setter for message
    public void setMessage(String message) {
        this.message = message;
    }

    // Getter for token
    public String getToken() {
        return token;
    }

    // Setter for token
    public void setToken(String token) {
        this.token = token;
    }

    // Getter for fullName
    public String getFullName() {
        return fullName;
    }

    // Setter for fullName
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    // Getter for email
    public String getEmail() {
        return email;
    }

    // Setter for email
    public void setEmail(String email) {
        this.email = email;
    }

    // Getter for role
    public String getRole() {
        return role;
    }

    // Setter for role
    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {

        return "LoginResponseDTO{" +
                "message='" + message + '\'' +
                ", token='" + token + '\'' +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}