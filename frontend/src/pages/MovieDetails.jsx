import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function MovieDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        axios.get(
            `http://localhost:8080/movie/get/${id}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )
        .then(response => {

            console.log(
                "MOVIE DETAILS:",
                response.data
            );

            setMovie(
                response.data
            );

            setLoading(false);
        })
        .catch(error => {

            console.error(
                "MOVIE DETAILS ERROR:",
                error
            );

            setError(
                "Unable to load movie details"
            );

            setLoading(false);
        });

    }, [id]);

    if (loading) {

        return (
            <div style={styles.center}>

                <h2>
                    Loading movie...
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

            </div>
        );
    }

    if (!movie) {

        return (
            <div style={styles.center}>

                <h2>
                    Movie not found
                </h2>

            </div>
        );
    }

    return (

        <div style={styles.container}>

            <div style={styles.card}>

                <h1>
                    {movie.title}
                </h1>

                <div style={styles.details}>

                    <p>
                        <strong>
                            Genre:
                        </strong>{" "}
                        {movie.genre}
                    </p>

                    <p>
                        <strong>
                            Language:
                        </strong>{" "}
                        {movie.language}
                    </p>

                    <p>
                        <strong>
                            Duration:
                        </strong>{" "}
                        {movie.duration} minutes
                    </p>

                    <p>
                        <strong>
                            Rating:
                        </strong>{" "}
                        ⭐ {movie.rating}
                    </p>

                </div>

                <button
                    style={styles.button}
                    onClick={() =>
                        navigate(
                            `/shows/${movie.id}`
                        )
                    }
                >
                    🎟️ View Shows
                </button>

            </div>

        </div>
    );
}

const styles = {

    container: {
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px"
    },

    card: {
        width: "600px",
        padding: "40px",
        border: "1px solid #ddd",
        borderRadius: "15px",
        boxShadow:
            "0 5px 20px rgba(0,0,0,0.1)"
    },

    details: {
        fontSize: "18px",
        lineHeight: "1.8"
    },

    button: {
        width: "100%",
        padding: "15px",
        marginTop: "20px",
        fontSize: "18px",
        cursor: "pointer",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#111",
        color: "white"
    },

    center: {
        textAlign: "center",
        padding: "100px"
    }
};

export default MovieDetails;