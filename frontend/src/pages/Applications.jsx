import { useEffect, useState } from "react";
import { getApplications } from "../services/jobService";
import Page from "../components/Page";

function statusClass(status) {
    const value = (status || "").toLowerCase();
    if (value.includes("reject")) {
        return "status status-rejected";
    }
    if (value.includes("apply") || value.includes("pending") || value.includes("review")) {
        return "status status-applied";
    }
    return "status";
}

function Applications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getApplications()
            .then((response) => {
                setApplications(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
                setLoading(false);
            });
    }, []);

    return (
        <Page
            kicker="Inbox"
            title="My applications"
            lede="Candidates who have written in. Status is shown as received from the desk."
        >
            {loading ? (
                <div className="card state">
                    <h2>Loading applications</h2>
                    <p>Pulling the current inbox.</p>
                </div>
            ) : error ? (
                <div className="card state">
                    <h2>Could not load applications</h2>
                    <p>Confirm the API is running, then refresh this page.</p>
                </div>
            ) : applications.length === 0 ? (
                <div className="card state">
                    <h2>No applications yet</h2>
                    <p>When someone applies to a listing, their note will appear in this column.</p>
                </div>
            ) : (
                <div className="app-list">
                    {applications.map((application) => (
                        <article className="card app-card" key={application.id}>
                            <div>
                                <h2>{application.applicantName}</h2>
                                <dl>
                                    <div>
                                        <dt>Email</dt>
                                        <dd>{application.applicantEmail}</dd>
                                    </div>
                                    <div>
                                        <dt>Resume</dt>
                                        <dd>{application.resume}</dd>
                                    </div>
                                    <div>
                                        <dt>Job ID</dt>
                                        <dd>{application.jobId}</dd>
                                    </div>
                                </dl>
                            </div>
                            <span className={statusClass(application.status)}>
                                {application.status || "Received"}
                            </span>
                        </article>
                    ))}
                </div>
            )}
        </Page>
    );
}

export default Applications;
