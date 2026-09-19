import { useNavigate } from "react-router-dom";

function AdminDashboard() {

    const navigate = useNavigate();

    const fullName =
        localStorage.getItem("fullName") ||
        "Admin";

    const role =
        localStorage.getItem("role");

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("fullName");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        navigate("/login");
    };

    if (role !== "ADMIN") {

        return (
            <div style={styles.center}>

                <h1>Access Denied</h1>

                <p>
                    Only administrators can access this page.
                </p>

                <button
                    style={styles.button}
                    onClick={() => navigate("/")}
                >
                    Go Home
                </button>

            </div>
        );
    }

    return (

        <div style={styles.container}>

            {/* HEADER */}

            <div style={styles.header}>

                <div>

                    <h1>
                        🎬 ShowSpot Admin Dashboard
                    </h1>

                    <p>
                        Welcome, {fullName} 👋
                    </p>

                </div>

                <button
                    style={styles.logoutButton}
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

            <hr />

            {/* DASHBOARD CARDS */}

            <div style={styles.dashboard}>

                {/* MOVIES */}

                <div
                    style={styles.card}
                    onClick={() =>
                        navigate("/admin/movies")
                    }
                >

                    <div style={styles.icon}>
                        🎬
                    </div>

                    <h2>
                        Movies
                    </h2>

                    <p>
                        Add, update and delete movies
                    </p>

                    <button style={styles.button}>
                        Manage Movies
                    </button>

                </div>


                {/* THEATRES */}

                <div
                    style={styles.card}
                    onClick={() =>
                        navigate("/admin/theatres")
                    }
                >

                    <div style={styles.icon}>
                        🏢
                    </div>

                    <h2>
                        Theatres
                    </h2>

                    <p>
                        Manage theatres
                    </p>

                    <button style={styles.button}>
                        Manage Theatres
                    </button>

                </div>


                {/* SCREENS */}

                <div
                    style={styles.card}
                    onClick={() =>
                        navigate("/admin/screens")
                    }
                >

                    <div style={styles.icon}>
                        🖥️
                    </div>

                    <h2>
                        Screens
                    </h2>

                    <p>
                        Manage screens and seats
                    </p>

                    <button style={styles.button}>
                        Manage Screens
                    </button>

                </div>


                {/* MOVIE SHOWS */}

                <div
                    style={styles.card}
                    onClick={() =>
                        navigate("/admin/shows")
                    }
                >

                    <div style={styles.icon}>
                        🎞️
                    </div>

                    <h2>
                        Movie Shows
                    </h2>

                    <p>
                        Create and manage movie shows
                    </p>

                    <button style={styles.button}>
                        Manage Shows
                    </button>

                </div>


                {/* SEATS */}

                <div
                    style={styles.card}
                    onClick={() =>
                        navigate("/admin/seats")
                    }
                >

                    <div style={styles.icon}>
                        💺
                    </div>

                    <h2>
                        Seats
                    </h2>

                    <p>
                        Generate and manage screen seats
                    </p>

                    <button style={styles.button}>
                        Manage Seats
                    </button>

                </div>

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

    dashboard: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "25px",
        marginTop: "40px"
    },

    card: {
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "15px",
        textAlign: "center",
        boxShadow:
            "0 5px 15px rgba(0,0,0,0.10)",
        cursor: "pointer",
        transition: "transform 0.2s"
    },

    icon: {
        fontSize: "50px",
        marginBottom: "15px"
    },

    button: {
        padding: "12px 20px",
        border: "none",
        borderRadius: "7px",
        backgroundColor: "#111",
        color: "white",
        cursor: "pointer",
        fontSize: "15px",
        marginTop: "10px"
    },

    logoutButton: {
        padding: "12px 25px",
        border: "none",
        borderRadius: "7px",
        backgroundColor: "#e50914",
        color: "white",
        cursor: "pointer",
        fontSize: "15px"
    },

    center: {
        textAlign: "center",
        padding: "100px"
    }
};

export default AdminDashboard;