import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Shows from "./pages/Shows";
import Seats from "./pages/Seats";
import BookingHistory from "./pages/BookingHistory";
import Payment from "./pages/Payment";

import AdminDashboard from "./pages/AdminDashboard";
import AdminMovies from "./pages/AdminMovies";
import AdminTheatres from "./pages/AdminTheatres";
import AdminScreens from "./pages/AdminScreens";
import AdminSeats from "./pages/AdminSeats";
import AdminShows from "./pages/AdminShows";


function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* USER PAGES */}

                <Route
                    path="/"
                    element={<Movies />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/movies"
                    element={<Movies />}
                />

                <Route
                    path="/movies/:id"
                    element={<MovieDetails />}
                />

                <Route
                    path="/shows/:movieId"
                    element={<Shows />}
                />

                <Route
                    path="/seats/:showId"
                    element={<Seats />}
                />

                <Route
                    path="/payment"
                    element={<Payment />}
                />

                <Route
                    path="/booking-history"
                    element={<BookingHistory />}
                />


                {/* ADMIN PAGES */}

                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin/movies"
                    element={<AdminMovies />}
                />

                <Route
                    path="/admin/theatres"
                    element={<AdminTheatres />}
                />

                <Route
                    path="/admin/screens"
                    element={<AdminScreens />}
                />

                <Route
                    path="/admin/seats"
                    element={<AdminSeats />}
                />

                <Route
                    path="/admin/shows"
                    element={<AdminShows />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;