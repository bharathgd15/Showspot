 🎬 ShowSpot – Movie Ticket Booking System

ShowSpot is a full-stack movie ticket booking application developed using  Java, Spring Boot,
ReactJS, and MySQL .The application allows users to browse movies, view available shows, select 
seats, book tickets, make payments, view booking history, and cancel tickets.It also provides an 
**Admin panel** for managing movies, theatres, screens, shows, and seats.

🚀 Features

 👤 User Features

- User registration
- User login
- JWT-based authentication
- Role-based authorization
- Browse available movies
- View movie details
- View available movie shows
- View available seats
- Select seats
- Book movie tickets
- Payment processing
- View booking history
- Cancel booked tickets

 🛠️ Admin Features

- Admin login
- Add, update, and delete movies
- Manage theatres
- Manage screens
- Add movie shows
- View movie shows
- Generate seats for screens
- Manage movie and theatre-related data

 🏗️ Project Architecture


                    ┌──────────────────────┐
                    │    React Frontend    │
                    │       (Vite)         │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │   Spring Boot API    │
                    │      Backend         │
                    └──────────┬───────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
       ┌─────────────────┐          ┌─────────────────┐
       │ Spring Security │          │ Spring Data JPA │
       │      + JWT      │          │    + Hibernate  │
       └─────────────────┘          └────────┬────────┘
                                             │
                                             ▼
                                    ┌─────────────────┐
                                    │      MySQL      │
                                    │     Database    │
                                    └─────────────────┘
