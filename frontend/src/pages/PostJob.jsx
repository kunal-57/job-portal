import { useState } from "react";
import { createJob } from "../services/jobService";
import Page from "../components/Page";

function PostJob() {
    const [job, setJob] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        experience: "",
        jobType: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setJob({
            ...job,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        createJob(job)
            .then((response) => {
                console.log(response.data);
                alert("Job posted successfully");
            })
            .catch((error) => {
                console.log(error);
                alert("Error while posting job");
            });
    };

    return (
        <Page
            kicker="Hiring desk"
            title="Post a job"
            lede="Write the role as you would a classified: precise title, clear city, honest salary."
        >
            <form className="card form-card form-grid" onSubmit={handleSubmit}>
                <div className="field span-2">
                    <label htmlFor="post-title">Job title</label>
                    <input
                        id="post-title"
                        className="input"
                        type="text"
                        name="title"
                        value={job.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="field span-2">
                    <label htmlFor="post-description">Description</label>
                    <textarea
                        id="post-description"
                        className="input"
                        name="description"
                        value={job.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="post-location">Location</label>
                    <input
                        id="post-location"
                        className="input"
                        type="text"
                        name="location"
                        value={job.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="post-salary">Salary</label>
                    <input
                        id="post-salary"
                        className="input"
                        type="number"
                        name="salary"
                        value={job.salary}
                        onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="post-experience">Experience</label>
                    <input
                        id="post-experience"
                        className="input"
                        type="text"
                        name="experience"
                        value={job.experience}
                        onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="post-jobType">Job type</label>
                    <input
                        id="post-jobType"
                        className="input"
                        type="text"
                        name="jobType"
                        value={job.jobType}
                        onChange={handleChange}
                    />
                </div>

                <div className="span-2">
                    <button className="btn-primary" type="submit">
                        Post job
                    </button>
                </div>
            </form>
        </Page>
    );
}

export default PostJob;
