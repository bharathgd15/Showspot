import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminSeats() {

    const navigate = useNavigate();

    const [screens, setScreens] = useState([]);
    const [selectedScreenId, setSelectedScreenId] = useState("");

    const [seats, setSeats] = useState([]);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const fetchScreens = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/screen/getAll",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            console.log(
                "ALL SCREENS:",
                response.data
            );

            setScreens(response.data);

        } catch (err) {

            console.error(
                "FETCH SCREENS ERROR:",
                err
            );

            setError(
                "Unable to load screens."
            );
        }
    };

    useEffect(() => {

        fetchScreens();

    }, []);

    const handleScreenChange = async (e) => {

        const screenId = e.target.value;

        setSelectedScreenId(screenId);

        setSeats([]);
        setMessage("");
        setError("");

        if (!screenId) {
            return;
        }

        try {

            const token =
                localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:8080/seat/screen/${screenId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            console.log(
                "SCREEN SEATS:",
                response.data
            );

            setSeats(response.data);

        } catch (err) {

            console.error(
                "FETCH SEATS ERROR:",
                err
            );

            setError(
                "Unable to load seats."
            );
        }
    };

    const generateSeats = async () => {

        if (!selectedScreenId) {

            setError(
                "Please select a screen."
            );

            return;
        }

        setMessage("");
        setError("");

        try {

            const token =
                localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:8080/seat/generate",
                {
                    screenId:
                        Number(selectedScreenId)
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            console.log(
                "GENERATE RESPONSE:",
                response.data
            );

            setMessage(response.data);

            // Reload seats after generation
            const seatsResponse =
                await axios.get(
                    `http://localhost:8080/seat/screen/${selectedScreenId}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setSeats(seatsResponse.data);

        } catch (err) {

            console.error(
                "GENERATE SEATS ERROR:",
                err
            );

            console.error(
                "BACKEND RESPONSE:",
                err.response?.data
            );

            setError(
                err.response?.data?.message ||
                "Unable to generate seats."
            );
        }
    };

    const selectedScreen =
        screens.find(
            (screen) =>
                screen.id === Number(selectedScreenId)
        );

    return (

        <div style={styles.container}>

            <div style={styles.header}>

                <h1>
                    💺 Manage Seats
                </h1>

                <button
                    style={styles.backButton}
                    onClick={() =>
                        navigate("/admin")
                    }
                >
                    ← Back to Dashboard
                </button>

            </div>

            <hr />

            {/* SCREEN SELECTION */}

            <div style={styles.formContainer}>

                <h2 style={styles.formTitle}>
                    🎯 Generate Seats
                </h2>

                <div style={styles.formGroup}>

                    <label>
                        Select Screen
                    </label>

                    <select
                        style={styles.input}
                        value={selectedScreenId}
                        onChange={handleScreenChange}
                    >

                        <option value="">
                            -- Select Screen --
                        </option>

                        {screens.map(
                            (screen) => (

                                <option
                                    key={screen.id}
                                    value={screen.id}
                                >
                                    {screen.screenName}
                                    {" - "}
                                    {screen.theatre?.theatreName ||
                                        "Theatre N/A"}
                                    {" - "}
                                    Capacity:{" "}
                                    {screen.capacity}
                                </option>

                            )
                        )}

                    </select>

                </div>

                {selectedScreen && (

                    <div style={styles.screenInfo}>

                        <p>
                            <strong>
                                Screen:
                            </strong>{" "}
                            {selectedScreen.screenName}
                        </p>

                        <p>
                            <strong>
                                Capacity:
                            </strong>{" "}
                            {selectedScreen.capacity}
                            {" seats"}
                        </p>

                        <p>
                            <strong>
                                Theatre:
                            </strong>{" "}
                            {selectedScreen.theatre?.theatreName ||
                                "N/A"}
                        </p>

                    </div>

                )}

                <button
                    style={styles.generateButton}
                    onClick={generateSeats}
                    disabled={!selectedScreenId}
                >
                    💺 Generate Seats
                </button>

                {message && (

                    <p style={styles.success}>
                        {message}
                    </p>

                )}

                {error && (

                    <p style={styles.error}>
                        {error}
                    </p>

                )}

            </div>

            {/* SEAT LIST */}

            {selectedScreenId && (

                <div style={styles.seatContainer}>

                    <h2>
                        📋 Seats
                    </h2>

                    {seats.length === 0 ? (

                        <p>
                            No seats generated for this
                            screen yet.
                        </p>

                    ) : (

                        <>

                            <p style={styles.seatCount}>
                                Total Seats:{" "}
                                <strong>
                                    {seats.length}
                                </strong>
                            </p>

                            <div style={styles.seatGrid}>

                                {seats.map(
                                    (seat) => (

                                        <div
                                            key={seat.id}
                                            style={
                                                styles.seat
                                            }
                                        >
                                            {seat.seatNumber}
                                        </div>

                                    )
                                )}

                            </div>

                        </>

                    )}

                </div>

            )}

        </div>
    );
}

const styles = {

    container: {
        padding: "40px",
        minHeight: "80vh",
        backgroundColor: "#f7f7f7"
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
    },

    backButton: {
        padding: "12px 20px",
        border: "none",
        borderRadius: "7px",
        backgroundColor: "#111",
        color: "white",
        cursor: "pointer",
        fontSize: "15px"
    },

    formContainer: {
        maxWidth: "800px",
        margin: "35px auto",
        padding: "35px",
        borderRadius: "16px",
        backgroundColor: "white",
        boxShadow:
            "0 6px 20px rgba(0,0,0,0.12)"
    },

    formTitle: {
        textAlign: "center",
        marginBottom: "30px",
        fontSize: "28px"
    },

    formGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px"
    },

    input: {
        width: "100%",
        boxSizing: "border-box",
        padding: "15px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        outline: "none",
        backgroundColor: "white"
    },

    screenInfo: {
        marginTop: "20px",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#f1f1f1"
    },

    generateButton: {
        width: "100%",
        padding: "14px",
        marginTop: "25px",
        border: "none",
        borderRadius: "7px",
        backgroundColor: "#111",
        color: "white",
        cursor: "pointer",
        fontSize: "16px"
    },

    success: {
        color: "green",
        textAlign: "center",
        fontWeight: "bold",
        marginTop: "20px"
    },

    error: {
        color: "red",
        textAlign: "center",
        fontWeight: "bold",
        marginTop: "20px"
    },

    seatContainer: {
        maxWidth: "1000px",
        margin: "50px auto",
        padding: "30px",
        borderRadius: "16px",
        backgroundColor: "white",
        boxShadow:
            "0 6px 20px rgba(0,0,0,0.10)",
        textAlign: "center"
    },

    seatCount: {
        marginBottom: "25px"
    },

    seatGrid: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "10px"
    },

    seat: {
        width: "55px",
        height: "45px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #ccc",
        borderRadius: "7px",
        backgroundColor: "#e8e8e8",
        fontWeight: "bold",
        fontSize: "14px"
    }
};

export default AdminSeats;