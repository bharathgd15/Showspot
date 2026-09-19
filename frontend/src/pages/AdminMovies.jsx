import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminMovies() {

    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [language, setLanguage] = useState("");
    const [duration, setDuration] = useState("");
    const [rating, setRating] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const fetchMovies = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/movie/getAll",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(
                "ADMIN MOVIES:",
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

    useEffect(() => {

        fetchMovies();

    }, []);

    const clearForm = () => {

        setTitle("");
        setGenre("");
        setLanguage("");
        setDuration("");
        setRating("");
        setEditingId(null);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        const token =
            localStorage.getItem("token");

        const movieData = {
            title: title,
            genre: genre,
            language: language,
            duration: Number(duration),
            rating: Number(rating)
        };

        try {

            if (editingId !== null) {

                movieData.id = editingId;

                await axios.put(
                    "http://localhost:8080/movie/update",
                    movieData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setMessage(
                    "Movie updated successfully."
                );

            } else {

                await axios.post(
                    "http://localhost:8080/movie/save",
                    movieData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setMessage(
                    "Movie added successfully."
                );
            }

            clearForm();

            fetchMovies();

        } catch (err) {

            console.error(
                "SAVE MOVIE ERROR:",
                err
            );

            console.error(
                "BACKEND RESPONSE:",
                err.response?.data
            );

            setError(
                err.response?.data?.message ||
                "Unable to save movie."
            );
        }
    };

    const handleEdit = (movie) => {

        setEditingId(movie.id);

        setTitle(
            movie.title || ""
        );

        setGenre(
            movie.genre || ""
        );

        setLanguage(
            movie.language || ""
        );

        setDuration(
            movie.duration || ""
        );

        setRating(
            movie.rating || ""
        );

        setMessage("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this movie?"
            );

        if (!confirmDelete) {
            return;
        }

        setMessage("");
        setError("");

        try {

            const token =
                localStorage.getItem("token");

            await axios.delete(
                `http://localhost:8080/movie/delete/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setMessage(
                "Movie deleted successfully."
            );

            fetchMovies();

        } catch (err) {

            console.error(
                "DELETE MOVIE ERROR:",
                err
            );

            console.error(
                "BACKEND RESPONSE:",
                err.response?.data
            );

            setError(
                err.response?.data?.message ||
                "Unable to delete movie."
            );
        }
    };

    return (

        <div style={styles.container}>

            <div style={styles.header}>

                <h1>
                    🎬 Manage Movies
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

            {/* ADD / UPDATE MOVIE */}

            <div style={styles.formContainer}>

                <h2 style={styles.formTitle}>
                    {editingId !== null
                        ? "✏️ Update Movie"
                        : "➕ Add Movie"}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    style={styles.form}
                >

                    <div style={styles.formRow}>

                        <div style={styles.formGroup}>

                            <label>
                                Movie Title
                            </label>

                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Enter movie title"
                                value={title}
                                onChange={(e) =>
                                    setTitle(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>

                        <div style={styles.formGroup}>

                            <label>
                                Genre
                            </label>

                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Example: Action"
                                value={genre}
                                onChange={(e) =>
                                    setGenre(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>

                    </div>

                    <div style={styles.formRow}>

                        <div style={styles.formGroup}>

                            <label>
                                Language
                            </label>

                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Example: Kannada"
                                value={language}
                                onChange={(e) =>
                                    setLanguage(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>

                        <div style={styles.formGroup}>

                            <label>
                                Duration (minutes)
                            </label>

                            <input
                                style={styles.input}
                                type="number"
                                placeholder="Example: 150"
                                value={duration}
                                onChange={(e) =>
                                    setDuration(
                                        e.target.value
                                    )
                                }
                                required
                                min="1"
                            />

                        </div>

                    </div>

                    <div style={styles.formRow}>

                        <div style={styles.formGroup}>

                            <label>
                                Rating
                            </label>

                            <input
                                style={styles.input}
                                type="number"
                                placeholder="Example: 8.5"
                                value={rating}
                                onChange={(e) =>
                                    setRating(
                                        e.target.value
                                    )
                                }
                                required
                                min="0"
                                max="10"
                                step="0.1"
                            />

                        </div>

                        <div style={styles.emptySpace}>
                        </div>

                    </div>

                    <div style={styles.buttonRow}>

                        <button
                            type="submit"
                            style={styles.button}
                        >
                            {editingId !== null
                                ? "Update Movie"
                                : "Add Movie"}
                        </button>

                        {editingId !== null && (

                            <button
                                type="button"
                                style={styles.cancelButton}
                                onClick={clearForm}
                            >
                                Cancel Edit
                            </button>

                        )}

                    </div>

                </form>

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

            {/* ALL MOVIES */}

            <div style={styles.listContainer}>

                <h2 style={styles.listTitle}>
                    📋 All Movies
                </h2>

                {movies.length === 0 ? (

                    <p>
                        No movies available.
                    </p>

                ) : (

                    <div style={styles.movieGrid}>

                        {movies.map((movie) => (

                            <div
                                key={movie.id}
                                style={styles.card}
                            >

                                <h2>
                                    {movie.title}
                                </h2>

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

                                <div style={styles.actions}>

                                    <button
                                        style={styles.editButton}
                                        onClick={() =>
                                            handleEdit(
                                                movie
                                            )
                                        }
                                    >
                                        ✏️ Edit
                                    </button>

                                    <button
                                        style={styles.deleteButton}
                                        onClick={() =>
                                            handleDelete(
                                                movie.id
                                            )
                                        }
                                    >
                                        🗑️ Delete
                                    </button>

                                </div>

                            </div>

                        ))}

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
        maxWidth: "850px",
        margin: "35px auto",
        padding: "35px",
        borderRadius: "16px",
        backgroundColor: "white",
        boxShadow: "0 6px 20px rgba(0,0,0,0.12)"
    },

    formTitle: {
        textAlign: "center",
        marginBottom: "30px",
        fontSize: "28px"
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    },

    formRow: {
        display: "flex",
        gap: "25px"
    },

    formGroup: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "8px"
    },

    emptySpace: {
        flex: 1
    },

    input: {
        width: "100%",
        boxSizing: "border-box",
        padding: "15px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        outline: "none"
    },

    buttonRow: {
        display: "flex",
        gap: "12px",
        marginTop: "10px"
    },

    button: {
        padding: "14px 28px",
        border: "none",
        borderRadius: "7px",
        backgroundColor: "#111",
        color: "white",
        cursor: "pointer",
        fontSize: "16px"
    },

    cancelButton: {
        padding: "14px 28px",
        border: "none",
        borderRadius: "7px",
        backgroundColor: "#777",
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

    listContainer: {
        marginTop: "50px"
    },

    listTitle: {
        textAlign: "center",
        marginBottom: "30px"
    },

    movieGrid: {
        display: "flex",
        flexWrap: "wrap",
        gap: "25px",
        justifyContent: "center"
    },

    card: {
        width: "280px",
        padding: "25px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "white"
    },

    actions: {
        display: "flex",
        gap: "10px",
        marginTop: "20px"
    },

    editButton: {
        flex: 1,
        padding: "11px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#222",
        color: "white",
        cursor: "pointer"
    },

    deleteButton: {
        flex: 1,
        padding: "11px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#dc3545",
        color: "white",
        cursor: "pointer"
    }
};

export default AdminMovies;