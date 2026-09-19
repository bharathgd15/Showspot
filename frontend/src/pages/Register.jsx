import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            const response = await api.post("/user/register", {
                fullName: fullName,
                email: email,
                password: password,
                role: "USER"
            });

            console.log(response.data);

            setMessage("Registration successful! 🎉");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            console.error(error);

            if (error.response) {
                setError(
                    error.response.data?.message ||
                    "Registration failed."
                );
            } else {
                setError(
                    "Cannot connect to the backend."
                );
            }
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-box">

                <h2>Create ShowSpot Account 🎬</h2>

                <form onSubmit={handleRegister}>

                    <div className="form-group">

                        <label>Full Name</label>

                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) =>
                                setFullName(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    <button type="submit">
                        Register
                    </button>

                </form>

                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <p>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;