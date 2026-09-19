import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminShows() {

    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [screens, setScreens] = useState([]);
    const [shows, setShows] = useState([]);

    const [movieId, setMovieId] = useState("");
    const [screenId, setScreenId] = useState("");
    const [showDate, setShowDate] = useState("");
    const [showTime, setShowTime] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(true);


    // ================================
    // FETCH MOVIES
    // ================================

    const fetchMovies = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/movie/getAll",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            console.log(
                "ALL MOVIES:",
                response.data
            );

            setMovies(response.data);

        } catch (err) {

            console.error(
                "FETCH MOVIES ERROR:",
                err
            );

            setError(
                "Unable to load movies."
            );
        }
    };


    // ================================
    // FETCH SCREENS
    // ================================

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


    // ================================
    // FETCH SHOWS
    // ================================

    const fetchShows = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/movie-show/getAll",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            console.log(
                "ALL MOVIE SHOWS:",
                response.data
            );

            setShows(response.data);

        } catch (err) {

            console.error(
                "FETCH SHOWS ERROR:",
                err
            );

            setError(
                "Unable to load movie shows."
            );

        } finally {

            setLoading(false);
        }
    };


    // ================================
    // LOAD DATA
    // ================================

    useEffect(() => {

        fetchMovies();
        fetchScreens();
        fetchShows();

    }, []);


    // ================================
    // ADD MOVIE SHOW
    // ================================

    const handleAddShow = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");


        // VALIDATION

        if (!movieId) {

            setError(
                "Please select a movie."
            );

            return;
        }

        if (!screenId) {

            setError(
                "Please select a screen."
            );

            return;
        }

        if (!showDate) {

            setError(
                "Please select a show date."
            );

            return;
        }

        if (!showTime) {

            setError(
                "Please select a show time."
            );

            return;
        }

        if (!ticketPrice) {

            setError(
                "Please enter ticket price."
            );

            return;
        }


        try {

            const token =
                localStorage.getItem("token");


            const showData = {

                movieId:
                    Number(movieId),

                screenId:
                    Number(screenId),

                showDate:
                    showDate,

                showTime:
                    showTime,

                ticketPrice:
                    Number(ticketPrice)
            };


            console.log(
                "ADDING MOVIE SHOW:",
                showData
            );


            const response =
                await axios.post(

                    "http://localhost:8080/movie-show/add",

                    showData,

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
                "ADD SHOW RESPONSE:",
                response.data
            );


            setMessage(
                response.data
            );


            // CLEAR FORM

            setMovieId("");
            setScreenId("");
            setShowDate("");
            setShowTime("");
            setTicketPrice("");


            // REFRESH SHOW LIST

            fetchShows();


        } catch (err) {

            console.error(
                "ADD SHOW ERROR:",
                err
            );

            console.error(
                "BACKEND RESPONSE:",
                err.response?.data
            );


            setError(
                err.response?.data?.message ||
                "Unable to add movie show."
            );
        }
    };


    // ================================
    // FORMAT TIME
    // ================================

    const formatTime = (time) => {

        if (!time) {
            return "N/A";
        }

        return time.substring(0, 5);
    };


    // ================================
    // GET THEATRE NAME
    // ================================

    const getTheatreName = (screen) => {

        if (
            screen &&
            screen.theatre &&
            screen.theatre.theatreName
        ) {

            return screen.theatre.theatreName;
        }

        return "N/A";
    };


    // ================================
    // LOADING
    // ================================

    if (loading) {

        return (

            <div style={styles.center}>

                <h2>
                    Loading Movie Shows...
                </h2>

            </div>
        );
    }


    return (

        <div style={styles.container}>

            {/* HEADER */}

            <div style={styles.header}>

                <h1>
                    🎞️ Manage Movie Shows
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


            {/* ADD SHOW FORM */}

            <div style={styles.formContainer}>

                <h2 style={styles.formTitle}>
                    ➕ Add Movie Show
                </h2>


                <form onSubmit={handleAddShow}>


                    {/* MOVIE */}

                    <div style={styles.formGroup}>

                        <label>
                            Select Movie
                        </label>

                        <select
                            style={styles.input}
                            value={movieId}
                            onChange={(e) =>
                                setMovieId(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                -- Select Movie --
                            </option>

                            {movies.map(
                                (movie) => (

                                    <option
                                        key={movie.id}
                                        value={movie.id}
                                    >
                                        {movie.title}
                                        {" - "}
                                        {movie.language}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* SCREEN */}

                    <div style={styles.formGroup}>

                        <label>
                            Select Screen
                        </label>

                        <select
                            style={styles.input}
                            value={screenId}
                            onChange={(e) =>
                                setScreenId(
                                    e.target.value
                                )
                            }
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

                                        {getTheatreName(
                                            screen
                                        )}

                                        {" - Capacity: "}

                                        {screen.capacity}

                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* DATE */}

                    <div style={styles.formGroup}>

                        <label>
                            Show Date
                        </label>

                        <input
                            type="date"
                            style={styles.input}
                            value={showDate}
                            onChange={(e) =>
                                setShowDate(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* TIME */}

                    <div style={styles.formGroup}>

                        <label>
                            Show Time
                        </label>

                        <input
                            type="time"
                            style={styles.input}
                            value={showTime}
                            onChange={(e) =>
                                setShowTime(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* PRICE */}

                    <div style={styles.formGroup}>

                        <label>
                            Ticket Price (₹)
                        </label>

                        <input
                            type="number"
                            style={styles.input}
                            placeholder="Enter ticket price"
                            min="1"
                            value={ticketPrice}
                            onChange={(e) =>
                                setTicketPrice(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* BUTTON */}

                    <button
                        type="submit"
                        style={styles.addButton}
                    >
                        🎞️ Add Movie Show
                    </button>


                </form>


                {/* MESSAGE */}

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


            {/* SHOW LIST */}

            <div style={styles.showContainer}>

                <h2>
                    📋 Existing Movie Shows
                </h2>


                {shows.length === 0 ? (

                    <p>
                        No movie shows available.
                    </p>

                ) : (

                    <div style={styles.showGrid}>

                        {shows.map(
                            (show) => (

                                <div
                                    key={show.id}
                                    style={styles.card}
                                >

                                    <h2>
                                        🎬{" "}
                                        {show.movie?.title ||
                                            "Movie N/A"}
                                    </h2>


                                    <p>
                                        <strong>
                                            Show ID:
                                        </strong>{" "}
                                        {show.id}
                                    </p>


                                    <p>
                                        <strong>
                                            🎭 Genre:
                                        </strong>{" "}
                                        {show.movie?.genre ||
                                            "N/A"}
                                    </p>


                                    <p>
                                        <strong>
                                            🌐 Language:
                                        </strong>{" "}
                                        {show.movie?.language ||
                                            "N/A"}
                                    </p>


                                    <p>
                                        <strong>
                                            🏢 Theatre:
                                        </strong>{" "}
                                        {getTheatreName(
                                            show.screen
                                        )}
                                    </p>


                                    <p>
                                        <strong>
                                            🖥️ Screen:
                                        </strong>{" "}
                                        {show.screen?.screenName ||
                                            "N/A"}
                                    </p>


                                    <p>
                                        <strong>
                                            📅 Date:
                                        </strong>{" "}
                                        {show.showDate ||
                                            "N/A"}
                                    </p>


                                    <p>
                                        <strong>
                                            🕐 Time:
                                        </strong>{" "}
                                        {formatTime(
                                            show.showTime
                                        )}
                                    </p>


                                    <p>
                                        <strong>
                                            💰 Ticket Price:
                                        </strong>{" "}
                                        ₹
                                        {show.ticketPrice}
                                    </p>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

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
        gap: "8px",
        marginBottom: "20px"
    },

    input: {
        width: "100%",
        boxSizing: "border-box",
        padding: "14px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        outline: "none",
        backgroundColor: "white"
    },

    addButton: {
        width: "100%",
        padding: "14px",
        marginTop: "10px",
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

    showContainer: {
        maxWidth: "1200px",
        margin: "50px auto",
        padding: "30px",
        borderRadius: "16px",
        backgroundColor: "white",
        boxShadow:
            "0 6px 20px rgba(0,0,0,0.10)"
    },

    showGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        marginTop: "25px"
    },

    card: {
        padding: "25px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "#fafafa",
        boxShadow:
            "0 3px 10px rgba(0,0,0,0.08)"
    },

    center: {
        textAlign: "center",
        padding: "100px"
    }
};


export default AdminShows;