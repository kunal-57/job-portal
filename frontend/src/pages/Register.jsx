import { useState } from "react";
import { registerUser } from "../services/jobService";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
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

        registerUser(user)
            .then((response) => {
                console.log(response.data);
                alert("Registration successful");
                navigate("/login");
            })
            .catch((error) => {
                console.log(error);
                alert("Registration failed");
            });
    };

    return (
        <div className="auth-page">
            <div className="card auth-card">
                <p className="page-kicker">Members</p>
                <h1>Register</h1>
                <p className="page-lede">Create an account to join the hiring desk.</p>

                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="register-name">Name</label>
                        <input
                            id="register-name"
                            className="input"
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="register-email">Email</label>
                        <input
                            id="register-email"
                            className="input"
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="register-password">Password</label>
                        <input
                            id="register-password"
                            className="input"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="btn-primary" type="submit">
                        Register
                    </button>
                </form>

                <p className="auth-foot">
                    Already registered? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
