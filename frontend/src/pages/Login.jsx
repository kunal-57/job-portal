import { useState } from "react";
import { loginUser } from "../services/jobService";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        loginUser(user)
            .then((response) => {
                console.log(response.data);

                if (response.data) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    alert("Login successful");
                    navigate("/");
                } else {
                    alert("Invalid email or password");
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Login failed");
            });
    };

    return (
        <div className="auth-page">
            <div className="card auth-card">
                <p className="page-kicker">Members</p>
                <h1>Login</h1>
                <p className="page-lede">Sign in to post roles and review applications.</p>

                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="login-email">Email</label>
                        <input
                            id="login-email"
                            className="input"
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="login-password">Password</label>
                        <input
                            id="login-password"
                            className="input"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="btn-primary" type="submit">
                        Login
                    </button>
                </form>

                <p className="auth-foot">
                    New to the desk? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
