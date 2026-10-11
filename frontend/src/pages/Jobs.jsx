import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobs, deleteJob } from "../services/jobService";
import Page from "../components/Page";

function truncate(text, length = 170) {
    if (!text) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    return `${text.slice(0, length).trim()}…`;
}

function Jobs() {
    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this job?")) {
            return;
        }

        deleteJob(id)
            .then(() => {
                alert("Job deleted successfully");
                setJobs(jobs.filter((job) => job.id !== id));
            })
            .catch((error) => {
                console.log(error);
                alert("Error while deleting job");
            });
    };

    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getJobs()
            .then((response) => {
                setJobs(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
                setLoading(false);
            });
    }, []);

    const filteredJobs = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Page
            kicker="Open listings"
            title="Available jobs"
            lede="A curated board of roles. Search by title or city, then open a posting to apply."
            actions={
                <div className="search-wrap field">
                    <label htmlFor="job-search">Search</label>
                    <input
                        id="job-search"
                        className="input"
                        type="text"
                        placeholder="Search jobs…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            }
        >
            {loading ? (
                <div className="card state">
                    <h2>Loading listings</h2>
                    <p>Fetching the current board from the hiring desk.</p>
                </div>
            ) : error ? (
                <div className="card state">
                    <h2>Could not load jobs</h2>
                    <p>The listings service is unavailable. Confirm the API is running, then refresh.</p>
                </div>
            ) : filteredJobs.length === 0 ? (
                <div className="card state">
                    <h2>{search ? "No matching roles" : "No listings yet"}</h2>
                    <p>
                        {search
                            ? "Try a different title or location, or clear the search field."
                            : "When a role is posted, it will appear here as a classified listing."}
                    </p>
                </div>
            ) : (
                <div className="job-grid">
                    {filteredJobs.map((job, index) => (
                        <article
                            className="card job-card"
                            key={job.id}
                            style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
                        >
                            <div>
                                <h2>{job.title}</h2>
                                <p className="job-desc">{truncate(job.description)}</p>
                                <div className="job-meta">
                                    <span className="pill">{job.location}</span>
                                    <span className="pill">{job.jobType}</span>
                                    <span className="pill">{job.experience}</span>
                                </div>
                                <p className="salary">₹{job.salary}</p>
                            </div>

                            <div className="job-actions">
                                <Link className="btn-primary" to={`/jobs/${job.id}`}>
                                    View
                                </Link>
                                <Link className="btn-ghost" to={`/edit-job/${job.id}`}>
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    className="btn-danger"
                                    onClick={() => handleDelete(job.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </Page>
    );
}

export default Jobs;
