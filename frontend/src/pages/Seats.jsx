import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Seats() {

    const { showId } = useParams();
    const navigate = useNavigate();

    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [show, setShow] = useState(null);

    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchData = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                if (!token) {

                    setError(
                        "Please login to continue."
                    );

                    setLoading(false);

                    return;
                }

                const seatResponse =
                    await axios.get(
                        `http://localhost:8080/seat/show/${showId}`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                console.log(
                    "SEATS:",
                    seatResponse.data
                );

                setSeats(
                    seatResponse.data
                );

                const showResponse =
                    await axios.get(
                        `http://localhost:8080/movie-show/get/${showId}`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                console.log(
                    "SHOW:",
                    showResponse.data
                );

                setShow(
                    showResponse.data
                );

            } catch (err) {

                console.error(
                    "SEAT/SHOW ERROR:",
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
                    err.response?.data ||
                    "Unable to load seats."
                );

            } finally {

                setLoading(false);
            }
        };

        fetchData();

    }, [showId]);

    const handleSeatClick = (seat) => {

        if (seat.booked) {
            return;
        }

        const alreadySelected =
            selectedSeats.some(
                selected =>
                    selected.id === seat.id
            );

        if (alreadySelected) {

            setSelectedSeats(
                selectedSeats.filter(
                    selected =>
                        selected.id !== seat.id
                )
            );

        } else {

            setSelectedSeats([
                ...selectedSeats,
                seat
            ]);
        }
    };

    const handleContinue = async () => {

        if (selectedSeats.length === 0) {

            alert(
                "Please select at least one seat."
            );

            return;
        }

        if (!show) {

            alert(
                "Show information is not available."
            );

            return;
        }

        setBooking(true);
        setError("");

        try {

            const token =
                localStorage.getItem("token");

            if (!token) {

                setError(
                    "Please login before booking."
                );

                setBooking(false);

                return;
            }

            const customerName =
                localStorage.getItem("fullName") ||
                "Customer";

            const bookingIds = [];

            for (const seat of selectedSeats) {

                const bookingData = {

                    movieShowId:
                        Number(showId),

                    seatId:
                        seat.id,

                    customerName:
                        customerName
                };

                console.log(
                    "BOOKING DATA:",
                    bookingData
                );

                const response =
                    await axios.post(
                        "http://localhost:8080/booking/book",
                        bookingData,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,

                                "Content-Type":
                                    "application/json"
                            }
                        }
                    );

                console.log(
                    "BOOKING RESPONSE:",
                    response.data
                );

                const bookingId =
                    response.data.bookingId;

                bookingIds.push(
                    bookingId
                );
            }

            const totalAmount =
                show.ticketPrice *
                selectedSeats.length;

            console.log(
                "BOOKING IDS:",
                bookingIds
            );

            console.log(
                "TOTAL AMOUNT:",
                totalAmount
            );

            navigate(
                "/payment",
                {
                    state: {
                        bookingIds:
                            bookingIds,

                        amount:
                            totalAmount
                    }
                }
            );

        } catch (err) {

            console.error(
                "BOOKING ERROR:",
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
                err.response?.data ||
                "Unable to book tickets."
            );

        } finally {

            setBooking(false);
        }
    };

    if (loading) {

        return (
            <div style={styles.center}>

                <h2>
                    Loading seats...
                </h2>

            </div>
        );
    }

    if (error && seats.length === 0) {

        return (
            <div style={styles.center}>

                <h2>
                    {error}
                </h2>

            </div>
        );
    }

    return (

        <div style={styles.container}>

            <h1>
                Select Your Seats
            </h1>

            {show && (

                <div style={styles.showInfo}>

                    <h2>
                        {show.movie?.title}
                    </h2>

                    <p>
                        Date: {show.showDate}
                    </p>

                    <p>
                        Time: {show.showTime}
                    </p>

                    <p>
                        Ticket Price: ₹
                        {show.ticketPrice}
                    </p>

                </div>
            )}

            <p>
                Show ID: {showId}
            </p>

            <div style={styles.screen}>
                SCREEN
            </div>

            <div style={styles.seatContainer}>

                {seats.map((seat) => {

                    const isSelected =
                        selectedSeats.some(
                            selected =>
                                selected.id === seat.id
                        );

                    return (

                        <button
                            key={seat.id}
                            disabled={seat.booked}
                            onClick={() =>
                                handleSeatClick(seat)
                            }
                            style={{
                                ...styles.seat,

                                backgroundColor:
                                    seat.booked
                                        ? "#777"
                                        : isSelected
                                            ? "#28a745"
                                            : "#eee",

                                color:
                                    seat.booked ||
                                    isSelected
                                        ? "white"
                                        : "black",

                                cursor:
                                    seat.booked
                                        ? "not-allowed"
                                        : "pointer"
                            }}
                        >

                            {seat.seatNumber}

                        </button>
                    );
                })}

            </div>

            <div style={styles.info}>

                <p>
                    🟩 Selected:
                    {" "}
                    {selectedSeats.length}
                </p>

                <p>
                    ⬜ Available
                </p>

                <p>
                    ⬛ Booked
                </p>

            </div>

            <h2>
                Selected Seats
            </h2>

            <p>
                {selectedSeats.length === 0
                    ? "No seats selected"
                    : selectedSeats
                        .map(
                            seat =>
                                seat.seatNumber
                        )
                        .join(", ")
                }
            </p>

            {selectedSeats.length > 0 &&
                show && (

                    <h2>
                        Total: ₹
                        {show.ticketPrice *
                            selectedSeats.length}
                    </h2>
                )}

            {error && (

                <p style={styles.error}>
                    {error}
                </p>
            )}

            <button
                style={{
                    ...styles.continueButton,
                    opacity:
                        selectedSeats.length === 0 ||
                        booking
                            ? 0.5
                            : 1
                }}
                disabled={
                    selectedSeats.length === 0 ||
                    booking
                }
                onClick={handleContinue}
            >

                {booking
                    ? "Booking..."
                    : "Continue to Payment"
                }

            </button>

            <button
                style={styles.backButton}
                onClick={() =>
                    navigate(-1)
                }
                disabled={booking}
            >
                Back
            </button>

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

    showInfo: {
        margin: "20px auto",
        padding: "20px",
        width: "400px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow:
            "0 3px 10px rgba(0,0,0,0.1)"
    },

    screen: {
        width: "70%",
        margin: "30px auto",
        padding: "15px",
        backgroundColor: "#222",
        color: "white",
        borderRadius: "5px"
    },

    seatContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "10px",
        maxWidth: "700px",
        margin: "30px auto"
    },

    seat: {
        width: "55px",
        height: "45px",
        border: "1px solid #aaa",
        borderRadius: "5px",
        fontWeight: "bold"
    },

    info: {
        marginTop: "20px",
        fontSize: "16px"
    },

    continueButton: {
        padding: "12px 30px",
        marginTop: "20px",
        marginRight: "10px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#e50914",
        color: "white",
        cursor: "pointer",
        fontSize: "16px"
    },

    backButton: {
        padding: "12px 30px",
        marginTop: "20px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#555",
        color: "white",
        cursor: "pointer",
        fontSize: "16px"
    },

    error: {
        color: "red",
        marginTop: "15px",
        fontWeight: "bold"
    }
};

export default Seats;