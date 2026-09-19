import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Movies() {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get("http://localhost:8080/movie/getAll", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {

            console.log("MOVIES:", response.data);

            setMovies(response.data);

        })
        .catch(error => {

            console.error("MOVIES ERROR:", error);

            setError("Unable to load movies");

        });

    }, []);

    return (

        <div style={styles.container}>

            <h1 style={styles.heading}>
                Now Showing 🎬
            </h1>

            {error && (
                <p style={styles.error}>
                    {error}
                </p>
            )}

            <div style={styles.grid}>

                {movies.map(movie => (

                    <div
                        key={movie.id}
                        style={styles.card}
                    >

                        <h2>
                            {movie.title}
                        </h2>

                        <p>
                            Genre: {movie.genre}
                        </p>

                        <p>
                            Language: {movie.language}
                        </p>

                        <p>
                            Duration: {movie.duration} minutes
                        </p>

                        <p>
                            Rating: {movie.rating}
                        </p>

                        <button
                            style={styles.button}
                            onClick={() =>
                                navigate(`/movies/${movie.id}`)
                            }
                        >
                            View Details
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

const styles = {

    container: {
        padding: "60px 8%"
    },

    heading: {
        textAlign: "center",
        marginBottom: "50px",
        fontSize: "42px"
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "30px"
    },

    card: {
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "15px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.08)"
    },

    button: {
        width: "100%",
        padding: "12px",
        marginTop: "15px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px"
    },

    error: {
        textAlign: "center",
        color: "red"
    }
};

export default Movies;