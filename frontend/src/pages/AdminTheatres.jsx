import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminTheatres() {

    const navigate = useNavigate();

    const [theatres, setTheatres] = useState([]);

    const [theatreName, setTheatreName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [totalScreens, setTotalScreens] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

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
                "ALL THEATRES:",
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

        fetchTheatres();

    }, []);

    const clearForm = () => {

        setTheatreName("");
        setCity("");
        setAddress("");
        setTotalScreens("");
        setEditingId(null);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        const token =
            localStorage.getItem("token");

        const theatreData = {

            theatreName: theatreName,

            city: city,

            address: address,

            totalScreens:
                Number(totalScreens)
        };

        try {

            if (editingId !== null) {

                theatreData.id = editingId;

                await axios.put(
                    "http://localhost:8080/theatre/update",
                    theatreData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setMessage(
                    "Theatre updated successfully."
                );

            } else {

                await axios.post(
                    "http://localhost:8080/theatre/save",
                    theatreData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setMessage(
                    "Theatre added successfully."
                );
            }

            clearForm();

            fetchTheatres();

        } catch (err) {

            console.error(
                "SAVE THEATRE ERROR:",
                err
            );

            console.error(
                "BACKEND RESPONSE:",
                err.response?.data
            );

            setError(
                err.response?.data?.message ||
                "Unable to save theatre."
            );
        }
    };

    const handleEdit = (theatre) => {

        setEditingId(theatre.id);

        setTheatreName(
            theatre.theatreName || ""
        );

        setCity(
            theatre.city || ""
        );

        setAddress(
            theatre.address || ""
        );

        setTotalScreens(
            theatre.totalScreens || ""
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
                "Are you sure you want to delete this theatre?"
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
                `http://localhost:8080/theatre/delete/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setMessage(
                "Theatre deleted successfully."
            );

            fetchTheatres();

        } catch (err) {

            console.error(
                "DELETE THEATRE ERROR:",
                err
            );

            console.error(
                "BACKEND RESPONSE:",
                err.response?.data
            );

            setError(
                err.response?.data?.message ||
                "Unable to delete theatre."
            );
        }
    };

    return (

        <div style={styles.container}>

            <div style={styles.header}>

                <h1>
                    🏢 Manage Theatres
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

            {/* ADD / UPDATE THEATRE */}

            <div style={styles.formContainer}>

                <h2 style={styles.formTitle}>

                    {editingId !== null
                        ? "✏️ Update Theatre"
                        : "➕ Add Theatre"}

                </h2>

                <form
                    onSubmit={handleSubmit}
                    style={styles.form}
                >

                    <div style={styles.formRow}>

                        <div style={styles.formGroup}>

                            <label>
                                Theatre Name
                            </label>

                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Enter theatre name"
                                value={theatreName}
                                onChange={(e) =>
                                    setTheatreName(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>

                        <div style={styles.formGroup}>

                            <label>
                                City
                            </label>

                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Enter city"
                                value={city}
                                onChange={(e) =>
                                    setCity(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>

                    </div>

                    <div style={styles.formGroup}>

                        <label>
                            Address
                        </label>

                        <input
                            style={styles.input}
                            type="text"
                            placeholder="Enter theatre address"
                            value={address}
                            onChange={(e) =>
                                setAddress(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <div style={styles.formGroup}>

                        <label>
                            Total Screens
                        </label>

                        <input
                            style={styles.input}
                            type="number"
                            placeholder="Example: 5"
                            value={totalScreens}
                            onChange={(e) =>
                                setTotalScreens(
                                    e.target.value
                                )
                            }
                            min="1"
                            required
                        />

                    </div>

                    <div style={styles.buttonRow}>

                        <button
                            type="submit"
                            style={styles.button}
                        >

                            {editingId !== null
                                ? "Update Theatre"
                                : "Add Theatre"}

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

            {/* ALL THEATRES */}

            <div style={styles.listContainer}>

                <h2 style={styles.listTitle}>
                    📋 All Theatres
                </h2>

                {theatres.length === 0 ? (

                    <p style={styles.noData}>
                        No theatres available.
                    </p>

                ) : (

                    <div style={styles.theatreGrid}>

                        {theatres.map((theatre) => (

                            <div
                                key={theatre.id}
                                style={styles.card}
                            >

                                <h2>
                                    🏢 {theatre.theatreName}
                                </h2>

                                <p>
                                    <strong>
                                        City:
                                    </strong>{" "}
                                    {theatre.city}
                                </p>

                                <p>
                                    <strong>
                                        Address:
                                    </strong>{" "}
                                    {theatre.address}
                                </p>

                                <p>
                                    <strong>
                                        Total Screens:
                                    </strong>{" "}
                                    {theatre.totalScreens}
                                </p>

                                <p>
                                    <strong>
                                        Theatre ID:
                                    </strong>{" "}
                                    {theatre.id}
                                </p>

                                <div style={styles.actions}>

                                    <button
                                        style={styles.editButton}
                                        onClick={() =>
                                            handleEdit(
                                                theatre
                                            )
                                        }
                                    >
                                        ✏️ Edit
                                    </button>

                                    <button
                                        style={styles.deleteButton}
                                        onClick={() =>
                                            handleDelete(
                                                theatre.id
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

    theatreGrid: {
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

export default AdminTheatres;