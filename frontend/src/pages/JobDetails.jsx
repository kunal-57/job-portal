import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById, applyForJob } from "../services/jobService";
import Page from "../components/Page";

function JobDetails() {
    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [loadError, setLoadError] = useState(false);

    const [applicantName, setApplicantName] = useState("");
    const [applicantEmail, setApplicantEmail] = useState("");
    const [resume, setResume] = useState("");

    useEffect(() => {
        getJobById(id)
            .then((response) => {
                setJob(response.data);
            })
            .catch((error) => {
                console.log(error);
                setLoadError(true);
            });
    }, [id]);

    const handleApply = (event) => {
        event.preventDefault();

        const application = {
            applicantName: applicantName,
            applicantEmail: applicantEmail,
            resume: resume,
            jobId: Number(id),
        };

        applyForJob(application)
            .then((response) => {
                console.log(response.data);
                alert("Application submitted successfully");
                setApplicantName("");
                setApplicantEmail("");
                setResume("");
            })
            .catch((error) => {
                console.log(error);
                alert("Error while applying");
            });
    };

    if (loadError) {
        return (
            <Page kicker="Posting" title="Job not found">
                <div className="card state">
                    <h2>This listing could not be loaded</h2>
                    <p>It may have been removed, or the hiring desk is offline.</p>
                </div>
            </Page>
        );
    }

    if (!job) {
        return (
            <Page kicker="Posting" title="Loading role">
                <div className="card state">
                    <h2>Opening the posting</h2>
                    <p>Please wait while we retrieve this listing.</p>
                </div>
            </Page>
        );
    }

    return (
        <div className="page">
            <div className="detail-layout">
                <article className="card article">
                    <p className="page-kicker">Role posting</p>
                    <h1 className="article-title">{job.title}</h1>
                    <div className="job-meta">
                        <span className="pill">{job.location}</span>
                        <span className="pill">{job.jobType}</span>
                        <span className="pill">{job.experience}</span>
                    </div>
                    <p className="article-body" style={{ marginTop: "22px" }}>
                        {job.description}
                    </p>
                    <dl className="meta-block">
                        <div>
                            <dt>Location</dt>
                            <dd>{job.location}</dd>
                        </div>
                        <div>
                            <dt>Salary</dt>
                            <dd className="salary">₹{job.salary}</dd>
                        </div>
                        <div>
                            <dt>Experience</dt>
                            <dd>{job.experience}</dd>
                        </div>
                        <div>
                            <dt>Job type</dt>
                            <dd>{job.jobType}</dd>
                        </div>
                    </dl>
                </article>

                <aside className="card detail-panel">
                    <h2>Apply for this job</h2>
                    <p className="page-lede">Send a concise application. All fields are reviewed by the desk.</p>

                    <form className="apply-form" onSubmit={handleApply}>
                        <div className="field">
                            <label htmlFor="applicant-name">Name</label>
                            <input
                                id="applicant-name"
                                className="input"
                                type="text"
                                value={applicantName}
                                onChange={(e) => setApplicantName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="applicant-email">Email</label>
                            <input
                                id="applicant-email"
                                className="input"
                                type="email"
                                value={applicantEmail}
                                onChange={(e) => setApplicantEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="applicant-resume">Resume</label>
                            <input
                                id="applicant-resume"
                                className="input"
                                type="text"
                                value={resume}
                                onChange={(e) => setResume(e.target.value)}
                                placeholder="resume.pdf"
                            />
                        </div>

                        <button className="btn-primary" type="submit">
                            Apply now
                        </button>
                    </form>
                </aside>
            </div>
        </div>
    );
}

export default JobDetails;
