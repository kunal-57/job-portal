import { BrowserRouter, Routes, Route } from "react-router-dom";

import PostJob from "./pages/PostJob";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Navbar from "./components/Navbar";
import Applications from "./pages/Applications";
import EditJob from "./pages/EditJob";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <main className="app-main">
                <Routes>
                    <Route path="/" element={<Jobs />} />

                    <Route path="/jobs/:id" element={<JobDetails />} />

                    <Route path="/post-job" element={<PostJob />} />

                    <Route path="/applications" element={<Applications />} />

                    <Route path="/edit-job/:id" element={<EditJob />} />

                    <Route path="/register" element={<Register />} />

                    <Route path="/login" element={<Login />} />

                    {/* Protected pages */}
                    <Route
                        path="/post-job"
                        element={
                            <ProtectedRoute>
                                <PostJob />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/applications"
                        element={
                            <ProtectedRoute>
                                <Applications />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/edit-job/:id"
                        element={
                            <ProtectedRoute>
                                <EditJob />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
