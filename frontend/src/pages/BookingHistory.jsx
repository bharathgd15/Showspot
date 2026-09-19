import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BookingHistory() {

    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchBookings = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                if (!token) {

                    setError(
                        "Please login to view your bookings."
                    );

                    setLoading(false);

                    return;
                }

                const response = await axios.get(
                    "http://localhost:8080/booking/history",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                console.log(
                    "BOOKING HISTORY:",
                    response.data
                );

                setBookings(response.data);

            } catch (err) {

                console.error(
                    "BOOKING HISTORY ERROR:",
                    err
                );

                if (err.response) {

                    console.error(
                        "STATUS:",
                        err.response.status
                    );

                    console.error(
                        "DATA:",
                        err.response.data
                    );
                }

                setError(
                    "Unable to load booking history."
                );

            } finally {

                setLoading(false);
            }
        };

        fetchBookings();

    }, []);

    const handleCancel = async (bookingId) => {

        const confirmCancel =
            window.confirm(
                "Are you sure you want to cancel this ticket?"
            );

        if (!confirmCancel) {
            return;
        }

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.delete(
                    `http://localhost:8080/booking/cancel/${bookingId}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            console.log(
                "CANCEL RESPONSE:",
                response.data
            );

            alert(
                "Ticket Cancelled Successfully"
            );

            setBookings(
                bookings.filter(
                    booking =>
                        booking.bookingId !== bookingId
                )
            );

        } catch (err) {

            console.error(
                "CANCEL ERROR:",
                err
            );

            if (err.response) {

                console.error(
                    "STATUS:",
                    err.response.status
                );

                console.error(
                    "DATA:",
                    err.response.data
                );
            }

            alert(
                err.response?.data ||
                "Unable to cancel ticket."
            );
        }
    };

    if (loading) {

        return (
            <div style={styles.center}>

                <h2>
                    Loading booking history...
                </h2>

            </div>
        );
    }

    if (error) {

        return (
            <div style={styles.center}>

                <h2>
                    {error}
                </h2>

                <button
                    style={styles.loginButton}
                    onClick={() =>
                        navigate("/login")
                    }
                >
                    Go to Login
                </button>

            </div>
        );
    }

    return (

        <div style={styles.container}>

            <h1>
                🎟️ My Booking History
            </h1>

            {bookings.length === 0 ? (

                <div style={styles.empty}>

                    <h2>
                        No bookings found
                    </h2>

                    <p>
                        You haven't booked any tickets yet.
                    </p>

                    <button
                        style={styles.moviesButton}
                        onClick={() =>
                            navigate("/movies")
                        }
                    >
                        Browse Movies
                    </button>

                </div>

            ) : (

                <div style={styles.bookingContainer}>

                    {bookings.map((booking) => (

                        <div
                            key={booking.bookingId}
                            style={styles.card}
                        >

                            <div style={styles.header}>

                                <h2>
                                    🎬 {booking.movieTitle}
                                </h2>

                                <span
                                    style={{
                                        ...styles.status,
                                        backgroundColor:
                                            booking.paymentStatus ===
                                            "SUCCESS"
                                                ? "#28a745"
                                                : "#ffc107"
                                    }}
                                >
                                    {booking.paymentStatus}
                                </span>

                            </div>

                            <hr />

                            <p>
                                <strong>
                                    🎟️ Booking ID:
                                </strong>{" "}
                                {booking.bookingId}
                            </p>

                            <p>
                                <strong>
                                    💺 Seat:
                                </strong>{" "}
                                {booking.seatNumber}
                            </p>

                            <p>
                                <strong>
                                    📅 Show Date:
                                </strong>{" "}
                                {booking.showDate}
                            </p>

                            <p>
                                <strong>
                                    🕐 Show Time:
                                </strong>{" "}
                                {booking.showTime}
                            </p>

                            <p>
                                <strong>
                                    💰 Amount Paid:
                                </strong>{" "}
                                ₹{booking.amount}
                            </p>

                            <p>
                                <strong>
                                    👤 Customer:
                                </strong>{" "}
                                {booking.customerName}
                            </p>

                            <p>
                                <strong>
                                    🕒 Booking Time:
                                </strong>{" "}
                                {booking.bookingTime
                                    ? new Date(
                                        booking.bookingTime
                                    ).toLocaleString()
                                    : "N/A"}
                            </p>

                            <hr />

                            <h3>
                                💳 Payment Details
                            </h3>

                            <p>
                                <strong>
                                    Payment Method:
                                </strong>{" "}
                                {booking.paymentMethod}
                            </p>

                            <p style={styles.transaction}>
                                <strong>
                                    Transaction ID:
                                </strong>{" "}
                                {booking.transactionId}
                            </p>

                            <p>
                                <strong>
                                    Payment Status:
                                </strong>{" "}
                                {booking.paymentStatus}
                            </p>

                            <button
                                style={styles.cancelButton}
                                onClick={() =>
                                    handleCancel(
                                        booking.bookingId
                                    )
                                }
                            >
                                ❌ Cancel Ticket
                            </button>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

const styles = {

    container: {
        padding: "30px",
        textAlign: "center"
    },

    center: {
        textAlign: "center",
        padding: "100px"
    },

    bookingContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "25px",
        marginTop: "30px"
    },

    card: {
        width: "380px",
        padding: "25px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow:
            "0 4px 15px rgba(0,0,0,0.1)",
        textAlign: "left",
        backgroundColor: "white"
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px"
    },

    status: {
        padding: "6px 10px",
        borderRadius: "15px",
        color: "white",
        fontSize: "12px",
        fontWeight: "bold"
    },

    transaction: {
        wordBreak: "break-all",
        fontSize: "14px"
    },

    empty: {
        marginTop: "60px"
    },

    cancelButton: {
        width: "100%",
        padding: "12px",
        marginTop: "15px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#dc3545",
        color: "white",
        cursor: "pointer",
        fontSize: "16px"
    },

    moviesButton: {
        padding: "12px 25px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#e50914",
        color: "white",
        cursor: "pointer",
        fontSize: "16px"
    },

    loginButton: {
        padding: "12px 25px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#e50914",
        color: "white",
        cursor: "pointer",
        fontSize: "16px"
    }
};

export default BookingHistory;