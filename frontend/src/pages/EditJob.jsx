import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../services/jobService";
import Page from "../components/Page";

function EditJob() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        experience: "",
        jobType: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getJobById(id)
            .then((response) => {
                setJob(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setJob({
            ...job,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        updateJob(id, job)
            .then((response) => {
                console.log(response.data);
                alert("Job updated successfully");
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                alert("Error while updating job");
            });
    };

    if (loading) {
        return (
            <Page kicker="Hiring desk" title="Edit job">
                <div className="card state">
                    <h2>Loading this listing</h2>
                    <p>Retrieving the current posting so you can revise it.</p>
                </div>
            </Page>
        );
    }

    if (error) {
        return (
            <Page kicker="Hiring desk" title="Edit job">
                <div className="card state">
                    <h2>Could not load this job</h2>
                    <p>Confirm the listing still exists, then try again.</p>
                </div>
            </Page>
        );
    }

    return (
        <Page
            kicker="Hiring desk"
            title="Edit job"
            lede="Revise the classified. Changes publish immediately to the board."
        >
            <form className="card form-card form-grid" onSubmit={handleSubmit}>
                <div className="field span-2">
                    <label htmlFor="edit-title">Job title</label>
                    <input
                        id="edit-title"
                        className="input"
                        type="text"
                        name="title"
                        value={job.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="field span-2">
                    <label htmlFor="edit-description">Description</label>
                    <textarea
                        id="edit-description"
                        className="input"
                        name="description"
                        value={job.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="edit-location">Location</label>
                    <input
                        id="edit-location"
                        className="input"
                        type="text"
                        name="location"
                        value={job.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="edit-salary">Salary</label>
                    <input
                        id="edit-salary"
                        className="input"
                        type="number"
                        name="salary"
                        value={job.salary}
                        onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="edit-experience">Experience</label>
                    <input
                        id="edit-experience"
                        className="input"
                        type="text"
                        name="experience"
                        value={job.experience}
                        onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="edit-jobType">Job type</label>
                    <input
                        id="edit-jobType"
                        className="input"
                        type="text"
                        name="jobType"
                        value={job.jobType}
                        onChange={handleChange}
                    />
                </div>

                <div className="span-2">
                    <button className="btn-primary" type="submit">
                        Update job
                    </button>
                </div>
            </form>
        </Page>
    );
}

export default EditJob;
