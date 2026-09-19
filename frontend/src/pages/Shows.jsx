import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Shows() {

    const { movieId } = useParams();
    const navigate = useNavigate();

    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchShows = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:8080/movie-show/getAll",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log("ALL SHOWS:", response.data);

                const movieShows = response.data.filter(
                    (show) =>
                        show.movie &&
                        show.movie.id === Number(movieId)
                );

                setShows(movieShows);

            } catch (err) {

                console.error("SHOW ERROR:", err);

                setError("Unable to load shows.");

            } finally {

                setLoading(false);
            }
        };

        fetchShows();

    }, [movieId]);

    const handleSelectShow = (showId) => {

        navigate(`/seats/${showId}`);

    };

    if (loading) {
        return (
            <div style={styles.center}>
                <h2>Loading shows...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.center}>
                <h2>{error}</h2>
            </div>
        );
    }

    return (
        <div style={styles.container}>

            <h1>Available Shows</h1>

            {shows.length === 0 ? (

                <h2>No shows available for this movie.</h2>

            ) : (

                <div style={styles.showContainer}>

                    {shows.map((show) => (

                        <div
                            key={show.id}
                            style={styles.card}
                        >

                            <h2>
                                {show.movie?.title}
                            </h2>

                            <p>
                                📅 Date: {show.showDate}
                            </p>

                            <p>
                                🕐 Time: {show.showTime}
                            </p>

                            <p>
                                🎬 Screen ID: {show.screen?.id}
                            </p>

                            <p>
                                💰 Ticket Price: ₹{show.ticketPrice}
                            </p>

                            <button
                                onClick={() =>
                                    handleSelectShow(show.id)
                                }
                                style={styles.button}
                            >
                                Select Show
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

    showContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        marginTop: "30px"
    },

    card: {
        width: "280px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "left"
    },

    button: {
        width: "100%",
        padding: "10px",
        marginTop: "15px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#e50914",
        color: "white",
        cursor: "pointer",
        fontSize: "16px"
    }
};

export default Shows;