import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            const response = await api.post(
                "/user/login",
                {
                    email: email,
                    password: password
                }
            );

            console.log(
                "FULL LOGIN RESPONSE:",
                response
            );

            console.log(
                "LOGIN DATA:",
                response.data
            );

            const token =
                response.data.token;

            const fullName =
                response.data.fullName || "";

            const userEmail =
                response.data.email || email;

            const role =
                response.data.role || "USER";

            console.log(
                "TOKEN:",
                token
            );

            console.log(
                "FULL NAME:",
                fullName
            );

            console.log(
                "EMAIL:",
                userEmail
            );

            console.log(
                "ROLE:",
                role
            );

            if (!token) {

                setError(
                    "Login successful, but token was not received."
                );

                return;
            }

            // Store login information
            localStorage.setItem(
                "token",
                token
            );

            localStorage.setItem(
                "fullName",
                fullName
            );

            localStorage.setItem(
                "email",
                userEmail
            );

            localStorage.setItem(
                "role",
                role
            );

            console.log(
                "LOGIN INFORMATION STORED"
            );

            setMessage(
                "Login successful! 🎉"
            );

            setTimeout(() => {

                if (role === "ADMIN") {

                    navigate("/admin");

                } else {

                    navigate("/");

                }

            }, 1000);

        } catch (error) {

            console.error(
                "LOGIN ERROR:",
                error
            );

            if (error.response) {

                console.log(
                    "ERROR RESPONSE:",
                    error.response.data
                );

                setError(
                    error.response.data?.message ||
                    "Invalid email or password."
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

                <h2>
                    Login to ShowSpot 🎬
                </h2>

                <form onSubmit={handleLogin}>

                    <div className="form-group">

                        <label>
                            Email
                        </label>

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

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    <button type="submit">
                        Login
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

                    Don't have an account?{" "}

                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;