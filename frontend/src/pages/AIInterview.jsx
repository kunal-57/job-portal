
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AIInterview() {

    const location = useLocation();
    const navigate = useNavigate();
    const loggedInUser = JSON.parse(
    localStorage.getItem("user")
);

    // Get job information from JobDetails
    const jobId = location.state?.jobId;
    const jobTitle = location.state?.jobTitle;

    const [profile, setProfile] = useState(
        location.state?.profile || ""
    );

    const [interviewStarted, setInterviewStarted] =
        useState(false);

    const [questions, setQuestions] = useState([]);

    const [currentQuestion, setCurrentQuestion] =
        useState(0);

    const [answer, setAnswer] = useState("");

    const [result, setResult] = useState(null);

    const [interviewId, setInterviewId] =
        useState(null);

    const [loading, setLoading] = useState(false);

    const [scores, setScores] = useState([]);

    const [finalSaved, setFinalSaved] = useState(false);


    // Start Interview
    const startInterview = async () => {

        if (!profile) {
            alert("Please select a profile");
            return;
        }

        if (!jobId) {
            alert("Job information is missing");
            return;
        }

        setLoading(true);

        try {

            // Create interview for this particular job
            const interviewResponse = await fetch(
                "http://localhost:8080/api/interviews/start",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        userId: loggedInUser.id,
                        jobId: Number(jobId),
                        profile: profile
                    })
                }
            );

            if (!interviewResponse.ok) {
                throw new Error(
                    "Could not start interview"
                );
            }

            const interviewData =
                await interviewResponse.json();

            console.log(
                "Interview started:",
                interviewData
            );

            setInterviewId(interviewData.id);


            // Load profile-specific questions
            const questionsResponse =
                await fetch(
                    `http://localhost:8080/api/interviews/questions/${encodeURIComponent(profile)}`
                );

            if (!questionsResponse.ok) {
                throw new Error(
                    "Could not load questions"
                );
            }

            const questionsData =
                await questionsResponse.json();

            console.log(
                "Questions:",
                questionsData
            );

            setQuestions(questionsData);

            setInterviewStarted(true);

        } catch (error) {

            console.error(error);

            alert(
                "Could not start interview"
            );

        } finally {

            setLoading(false);
        }
    };


    // Save final interview result
    const saveFinalResult = async (
        finalAverage
    ) => {

        // IMPORTANT:
        // Candidate must score MORE THAN 7
        const status =
            finalAverage > 7
                ? "PASSED"
                : "FAILED";


        try {

            const response = await fetch(
                `http://localhost:8080/api/interviews/complete/${interviewId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        totalScore:
                            finalAverage,

                        status:
                            status
                    })
                }
            );

            if (!response.ok) {

                throw new Error(
                    "Could not save final result"
                );
            }

            const data =
                await response.json();

            console.log(
                "Final interview saved:",
                data
            );

            setFinalSaved(true);

        } catch (error) {

            console.error(error);

            alert(
                "Could not save final interview result"
            );
        }
    };


    // Submit answer
    const handleSubmit = async () => {

        if (!answer.trim()) {

            alert(
                "Please enter your answer"
            );

            return;
        }

        if (!interviewId) {

            alert(
                "Interview has not started yet"
            );

            return;
        }

        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:8080/api/ai/check-answer",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        interviewId:
                            interviewId,

                        question:
                            questions[currentQuestion],

                        answer:
                            answer
                    })
                }
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to check answer"
                );
            }

            const data =
                await response.json();

            console.log(
                "AI Result:",
                data
            );

            setResult(data);


            const updatedScores = [
                ...scores,
                Number(data.score)
            ];

            setScores(
                updatedScores
            );


            // Last question
            if (
                currentQuestion ===
                questions.length - 1
            ) {

                const total =
                    updatedScores.reduce(
                        (sum, score) =>
                            sum + score,
                        0
                    );

                const average =
                    total /
                    updatedScores.length;


                await saveFinalResult(
                    average
                );
            }

        } catch (error) {

            console.error(error);

            alert(
                "Something went wrong while checking the answer"
            );

        } finally {

            setLoading(false);
        }
    };


    // Next question
    const handleNextQuestion = () => {

        setCurrentQuestion(
            currentQuestion + 1
        );

        setAnswer("");

        setResult(null);
    };


    // Total score
    const calculateTotal = () => {

        return scores.reduce(
            (total, score) =>
                total + score,
            0
        );
    };


    // Average score
    const calculateAverage = () => {

        if (scores.length === 0) {
            return 0;
        }

        return (
            calculateTotal() /
            scores.length
        ).toFixed(1);
    };


    // Eligibility status
    const calculateStatus = () => {

        const average =
            Number(
                calculateAverage()
            );

        return average > 7
            ? "PASSED"
            : "FAILED";
    };


    // --------------------------------
    // PROFILE SELECTION SCREEN
    // --------------------------------

    if (!interviewStarted) {

        return (

            <div>

                <h2>
                    AI Interview
                </h2>

                <h3>
                    Job: {jobTitle || "Selected Job"}
                </h3>

                <p>
                    Job ID: {jobId}
                </p>

                <h3>
                    Select the profile for your interview
                </h3>

                <select
                    value={profile}
                    onChange={(e) =>
                        setProfile(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        -- Select Profile --
                    </option>

                    <option value="Java Developer">
                        Java Developer
                    </option>

                    <option value="React Developer">
                        React Developer
                    </option>

                    <option value="Python Developer">
                        Python Developer
                    </option>

                    <option value="Angular Developer">
                        Angular Developer
                    </option>

                </select>

                <br />
                <br />

                <button
                    onClick={startInterview}
                    disabled={loading}
                >

                    {loading
                        ? "Starting..."
                        : "Start Interview"}

                </button>

            </div>
        );
    }


    // --------------------------------
    // INTERVIEW SCREEN
    // --------------------------------

    return (

        <div>

            <h2>
                AI Interview
            </h2>

            <p>
                <strong>
                    Job:
                </strong>{" "}
                {jobTitle}
            </p>

            <p>
                <strong>
                    Profile:
                </strong>{" "}
                {profile}
            </p>

            {interviewId && (

                <p>
                    Interview ID:
                    {" "}
                    {interviewId}
                </p>

            )}

            <h3>

                Question{" "}
                {currentQuestion + 1}
                {" "}
                of{" "}
                {questions.length}

            </h3>

            <p>

                <strong>
                    {questions[currentQuestion]}
                </strong>

            </p>


            {/* Answer */}

            {!result && (

                <>

                    <textarea
                        rows="6"
                        cols="60"
                        placeholder="Write your answer..."
                        value={answer}
                        onChange={(e) =>
                            setAnswer(
                                e.target.value
                            )
                        }
                    />

                    <br />
                    <br />

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                    >

                        {loading
                            ? "Checking..."
                            : "Submit Answer"}

                    </button>

                </>

            )}


            {/* Result */}

            {result && (

                <div>

                    <hr />

                    <h2>
                        Interview Result
                    </h2>

                    <h3>
                        Score:
                        {" "}
                        {result.score}/10
                    </h3>

                    <h3>
                        AI Feedback
                    </h3>

                    <p>
                        {result.feedback}
                    </p>


                    {currentQuestion <
                    questions.length - 1 ? (

                        <button
                            onClick={
                                handleNextQuestion
                            }
                        >
                            Next Question
                        </button>

                    ) : (

                        <div>

                            <hr />

                            <h2>
                                Interview Completed 🎉
                            </h2>

                            <h3>
                                Job:
                                {" "}
                                {jobTitle}
                            </h3>

                            <h3>
                                Profile:
                                {" "}
                                {profile}
                            </h3>


                            <h3>
                                All Scores
                            </h3>

                            {scores.map(
                                (
                                    score,
                                    index
                                ) => (

                                    <p
                                        key={index}
                                    >

                                        Question{" "}
                                        {index + 1}
                                        :
                                        {" "}
                                        {score}/10

                                    </p>

                                )
                            )}


                            <hr />

                            <h3>
                                Total Score:
                                {" "}
                                {calculateTotal()}
                                /
                                {questions.length * 10}
                            </h3>


                            <h3>
                                Average Score:
                                {" "}
                                {calculateAverage()}
                                /10
                            </h3>


                            <h3>
                                Status:
                                {" "}
                                {calculateStatus()}
                            </h3>


                            {Number(calculateAverage()) > 7 ? (

                                <div>

                                    <h3>
                                        ✅ You are eligible to apply!
                                    </h3>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/jobs/${jobId}`
                                            )
                                        }
                                    >
                                        Continue to Job
                                    </button>

                                </div>

                            ) : (

                                <div>

                                    <h3>
                                        ❌ You are not eligible to apply.
                                    </h3>

                                    <p>
                                        You need an average score
                                        greater than 7/10 to apply
                                        for this job.
                                    </p>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/jobs/${jobId}`
                                            )
                                        }
                                    >
                                        Back to Job
                                    </button>

                                </div>

                            )}


                            {finalSaved && (

                                <p>
                                    ✅ Final interview
                                    result saved
                                    successfully.
                                </p>

                            )}

                        </div>

                    )}

                </div>

            )}

        </div>
    );
}

export default AIInterview;
