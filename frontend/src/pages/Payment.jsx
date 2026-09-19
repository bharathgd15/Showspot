import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Payment() {

    const navigate = useNavigate();
    const location = useLocation();

    const bookingIds =
        location.state?.bookingIds || [];

    const amount =
        location.state?.amount || 0;

    const [paymentMethod, setPaymentMethod] =
        useState("UPI");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    // ==========================================
    // CHECK BOOKING IDS
    // ==========================================

    if (bookingIds.length === 0) {

        return (
            <div style={styles.center}>

                <h2>
                    No booking selected for payment.
                </h2>

                <button
                    style={styles.button}
                    onClick={() =>
                        navigate("/movies")
                    }
                >
                    Browse Movies
                </button>

            </div>
        );
    }


    // ==========================================
    // MAKE PAYMENT
    // ==========================================

    const handlePayment = async () => {

        setLoading(true);
        setError("");

        try {

            const token =
                localStorage.getItem("token");

            if (!token) {

                setError(
                    "Please login before making payment."
                );

                setLoading(false);

                return;
            }


            // ==================================
            // PAY FOR EACH BOOKING
            // ==================================

            for (const bookingId of bookingIds) {

                const paymentData = {

                    bookingId:
                        bookingId,

                    paymentMethod:
                        paymentMethod
                };


                console.log(
                    "PAYMENT DATA:",
                    paymentData
                );


                const response =
                    await axios.post(
                        "http://localhost:8080/payment/pay",
                        paymentData,
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
                    "PAYMENT RESPONSE:",
                    response.data
                );
            }


            // ==================================
            // SUCCESS
            // ==================================

            alert(
                "Payment Successful!"
            );

            navigate(
                "/booking-history"
            );

        } catch (err) {

            console.error(
                "PAYMENT ERROR:",
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
                "Payment failed."
            );

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // PAYMENT UI
    // ==========================================

    return (

        <div style={styles.container}>

            <div style={styles.card}>

                <h1>
                    💳 Payment
                </h1>

                <hr />


                <h2>
                    Booking Details
                </h2>

                <p>
                    <strong>
                        Number of Tickets:
                    </strong>{" "}
                    {bookingIds.length}
                </p>

                <p>
                    <strong>
                        Total Amount:
                    </strong>{" "}
                    ₹{amount}
                </p>


                <h2>
                    Select Payment Method
                </h2>


                <div style={styles.methods}>

                    <label style={styles.option}>

                        <input
                            type="radio"
                            value="UPI"
                            checked={
                                paymentMethod === "UPI"
                            }
                            onChange={(e) =>
                                setPaymentMethod(
                                    e.target.value
                                )
                            }
                        />

                        <span>
                            📱 UPI
                        </span>

                    </label>


                    <label style={styles.option}>

                        <input
                            type="radio"
                            value="CARD"
                            checked={
                                paymentMethod === "CARD"
                            }
                            onChange={(e) =>
                                setPaymentMethod(
                                    e.target.value
                                )
                            }
                        />

                        <span>
                            💳 Card
                        </span>

                    </label>


                    <label style={styles.option}>

                        <input
                            type="radio"
                            value="NET_BANKING"
                            checked={
                                paymentMethod ===
                                "NET_BANKING"
                            }
                            onChange={(e) =>
                                setPaymentMethod(
                                    e.target.value
                                )
                            }
                        />

                        <span>
                            🏦 Net Banking
                        </span>

                    </label>

                </div>


                {error && (

                    <p style={styles.error}>
                        {error}
                    </p>

                )}


                <button
                    style={{
                        ...styles.payButton,
                        opacity:
                            loading ? 0.6 : 1
                    }}
                    onClick={handlePayment}
                    disabled={loading}
                >

                    {loading
                        ? "Processing Payment..."
                        : `Pay ₹${amount}`
                    }

                </button>


                <button
                    style={styles.backButton}
                    onClick={() =>
                        navigate(-1)
                    }
                    disabled={loading}
                >
                    Back
                </button>

            </div>

        </div>
    );
}


// ==========================================
// STYLES
// ==========================================

const styles = {

    container: {
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px"
    },

    center: {
        textAlign: "center",
        padding: "100px"
    },

    card: {
        width: "450px",
        padding: "35px",
        border: "1px solid #ddd",
        borderRadius: "15px",
        boxShadow:
            "0 5px 20px rgba(0,0,0,0.1)",
        backgroundColor: "white"
    },

    methods: {
        marginTop: "20px",
        marginBottom: "20px"
    },

    option: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "10px",
        cursor: "pointer"
    },

    payButton: {
        width: "100%",
        padding: "14px",
        border: "none",
        borderRadius: "7px",
        backgroundColor: "#28a745",
        color: "white",
        cursor: "pointer",
        fontSize: "17px",
        fontWeight: "bold"
    },

    backButton: {
        width: "100%",
        padding: "12px",
        marginTop: "10px",
        border: "none",
        borderRadius: "7px",
        backgroundColor: "#555",
        color: "white",
        cursor: "pointer",
        fontSize: "16px"
    },

    button: {
        padding: "12px 25px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#e50914",
        color: "white",
        cursor: "pointer",
        fontSize: "16px"
    },

    error: {
        color: "red",
        fontWeight: "bold",
        marginBottom: "15px"
    }
};

export default Payment;