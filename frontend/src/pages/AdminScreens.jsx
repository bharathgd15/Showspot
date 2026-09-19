import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminScreens() {

    const navigate = useNavigate();

    const [screens, setScreens] = useState([]);
    const [theatres, setTheatres] = useState([]);

    const [screenName, setScreenName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [theatreId, setTheatreId] = useState("");

    const [editingId, setEditingId] = useState(null);

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

    const fetchTheatres = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/theatre/getAll",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            console.log(
                "THEATRES:",
                response.data
            );

            setTheatres(response.data);

        } catch (err) {

            console.error(
                "FETCH THEATRES ERROR:",
                err
            );

            setError(
                "Unable to load theatres."
            );
        }
    };

    useEffect(() => {

        fetchScreens();
        fetchTheatres();

    }, []);

    const clearForm = () => {

        setScreenName("");
        setCapacity("");
        setTheatreId("");
        setEditingId(null);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        const token =
            localStorage.getItem("token");

        const screenData = {

            screenName: screenName,

            capacity: Number(capacity),

            theatre: {
                id: Number(theatreId)
            }
        };

        try {

            if (editingId !== null) {

                screenData.id = editingId;

                await axios.put(
                    "http://localhost:8080/screen/update",
                    screenData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setMessage(
                    "Screen updated successfully."
                );

            } else {

                await axios.post(
                    "http://localhost:8080/screen/save",
                    screenData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setMessage(
                    "Screen added successfully."
                );
            }

            clearForm();

            fetchScreens();

        } catch (err) {

            console.error(
                "SAVE SCREEN ERROR:",
                err
            );

            console.error(
                "BACKEND RESPONSE:",
                err.response?.data
            );

            setError(
                err.response?.data?.message ||
                "Unable to save screen."
            );
        }
    };

    const handleEdit = (screen) => {

        setEditingId(screen.id);

        setScreenName(
            screen.screenName || ""
        );

        setCapacity(
            screen.capacity || ""
        );

        setTheatreId(
            screen.theatre?.id || ""
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
                "Are you sure you want to delete this screen?"
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
                `http://localhost:8080/screen/delete/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setMessage(
                "Screen deleted successfully."
            );

            fetchScreens();

        } catch (err) {

            console.error(
                "DELETE SCREEN ERROR:",
                err
            );

            console.error(
                "BACKEND RESPONSE:",
                err.response?.data
            );

            setError(
                err.response?.data?.message ||
                "Unable to delete screen."
            );
        }
    };

    return (

        <div style={styles.container}>

            <div style={styles.header}>

                <h1>
                    🖥️ Manage Screens
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

            {/* ADD / UPDATE SCREEN */}

            <div style={styles.formContainer}>

                <h2 style={styles.formTitle}>

                    {editingId !== null
                        ? "✏️ Update Screen"
                        : "➕ Add Screen"}

                </h2>

                <form
                    onSubmit={handleSubmit}
                    style={styles.form}
                >

                    <div style={styles.formRow}>

                        <div style={styles.formGroup}>

                            <label>
                                Screen Name
                            </label>

                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Example: Screen 1"
                                value={screenName}
                                onChange={(e) =>
                                    setScreenName(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>

                        <div style={styles.formGroup}>

                            <label>
                                Capacity
                            </label>

                            <input
                                style={styles.input}
                                type="number"
                                placeholder="Example: 100"
                                value={capacity}
                                onChange={(e) =>
                                    setCapacity(
                                        e.target.value
                                    )
                                }
                                min="1"
                                required
                            />

                        </div>

                    </div>

                    <div style={styles.formGroup}>

                        <label>
                            Select Theatre
                        </label>

                        <select
                            style={styles.input}
                            value={theatreId}
                            onChange={(e) =>
                                setTheatreId(
                                    e.target.value
                                )
                            }
                            required
                        >

                            <option value="">
                                -- Select Theatre --
                            </option>

                            {theatres.map(
                                (theatre) => (

                                    <option
                                        key={theatre.id}
                                        value={theatre.id}
                                    >
                                        {theatre.theatreName}
                                        {" - "}
                                        {theatre.city}
                                    </option>

                                )
                            )}

                        </select>

                    </div>

                    <div style={styles.buttonRow}>

                        <button
                            type="submit"
                            style={styles.button}
                        >

                            {editingId !== null
                                ? "Update Screen"
                                : "Add Screen"}

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

            {/* ALL SCREENS */}

            <div style={styles.listContainer}>

                <h2 style={styles.listTitle}>
                    📋 All Screens
                </h2>

                {screens.length === 0 ? (

                    <p style={styles.noData}>
                        No screens available.
                    </p>

                ) : (

                    <div style={styles.screenGrid}>

                        {screens.map((screen) => (

                            <div
                                key={screen.id}
                                style={styles.card}
                            >

                                <h2>
                                    🖥️ {screen.screenName}
                                </h2>

                                <p>
                                    <strong>
                                        Capacity:
                                    </strong>{" "}
                                    {screen.capacity}
                                    {" seats"}
                                </p>

                                <p>
                                    <strong>
                                        Theatre:
                                    </strong>{" "}
                                    {screen.theatre?.theatreName ||
                                        "N/A"}
                                </p>

                                <p>
                                    <strong>
                                        City:
                                    </strong>{" "}
                                    {screen.theatre?.city ||
                                        "N/A"}
                                </p>

                                <p>
                                    <strong>
                                        Screen ID:
                                    </strong>{" "}
                                    {screen.id}
                                </p>

                                <div style={styles.actions}>

                                    <button
                                        style={styles.editButton}
                                        onClick={() =>
                                            handleEdit(
                                                screen
                                            )
                                        }
                                    >
                                        ✏️ Edit
                                    </button>

                                    <button
                                        style={styles.deleteButton}
                                        onClick={() =>
                                            handleDelete(
                                                screen.id
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

    screenGrid: {
        display: "flex",
        flexWrap: "wrap",
        gap: "25px",
        justifyContent: "center"
    },

    card: {
        width: "320px",
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
    },

    noData: {
        textAlign: "center"
    }
};

export default AdminScreens;