import { NavLink, useNavigate } from "react-router-dom";

function Mark() {
    return (
        <svg className="mark" viewBox="0 0 28 28" aria-hidden="true">
            <rect width="28" height="28" fill="#c4a35a" />
            <rect x="6" y="5" width="3" height="18" fill="#16324f" />
            <rect x="11" y="8" width="11" height="1.6" fill="#16324f" />
            <rect x="11" y="13" width="9" height="1.6" fill="#16324f" />
            <rect x="11" y="18" width="7" height="1.6" fill="#16324f" />
        </svg>
    );
}

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        alert("Logout successful");
        navigate("/login");
    };

    return (
        <header className="nav">
            <div className="nav-inner">
                <NavLink to="/" className="wordmark">
                    <Mark />
                    <span className="wordmark-text">
                        <span className="wordmark-name">Aether Desk</span>
                        <span className="wordmark-sub">Job Portal</span>
                    </span>
                </NavLink>

                <nav className="nav-links" aria-label="Primary">
                    <NavLink to="/" end>
                        Jobs
                    </NavLink>
                    <NavLink to="/post-job">Post a Job</NavLink>
                    <NavLink to="/applications">Applications</NavLink>

                    {user ? (
                        <span className="user-chip">
                            <span>Welcome, {user.name}</span>
                            <button type="button" className="btn-ghost" onClick={handleLogout}>
                                Logout
                            </button>
                        </span>
                    ) : (
                        <>
                            <NavLink to="/register">Register</NavLink>
                            <NavLink to="/login">Login</NavLink>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
