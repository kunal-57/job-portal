
package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Interview;
import com.example.demo.service.InterviewService;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin(origins = "http://localhost:5173")
public class InterviewController {

    private final InterviewService interviewService;


    public InterviewController(
            InterviewService interviewService) {

        this.interviewService = interviewService;
    }


    // ==========================================
    // START INTERVIEW
    // ==========================================

    @PostMapping("/start")
    public Interview startInterview(
            @RequestBody StartInterviewRequest request) {

        return interviewService.createInterview(
                request.getUserId(),
                request.getJobId(),
                request.getProfile()
        );
    }


    // ==========================================
    // GET QUESTIONS ACCORDING TO PROFILE
    // ==========================================

    @GetMapping("/questions/{profile}")
    public List<String> getQuestions(
            @PathVariable String profile) {

        if (profile.equalsIgnoreCase("Java Developer")) {

            return List.of(
                    "What is OOP in Java?",
                    "What is Dependency Injection in Spring Boot?",
                    "What is Spring Boot?",
                    "What is REST API?",
                    "What is the difference between ArrayList and LinkedList?"
            );
        }


        if (profile.equalsIgnoreCase("React Developer")) {

            return List.of(
                    "What is React?",
                    "What are components in React?",
                    "What is useState in React?",
                    "What is useEffect in React?",
                    "What are props in React?"
            );
        }


        return List.of(
                "Tell me about your technical skills.",
                "Explain one project you have worked on.",
                "What programming languages do you know?",
                "What is an API?",
                "How do you debug an application?"
        );
    }


    // ==========================================
    // COMPLETE INTERVIEW
    // ==========================================

    @PutMapping("/complete/{id}")
    public Interview completeInterview(
            @PathVariable Long id,
            @RequestBody CompleteInterviewRequest request) {

        return interviewService.completeInterview(
                id,
                request.getTotalScore(),
                request.getStatus()
        );
    }


    // ==========================================
    // GET LATEST INTERVIEW FOR USER + JOB
    // ==========================================

    @GetMapping("/user/{userId}/job/{jobId}")
    public Interview getLatestInterviewForJob(
            @PathVariable Long userId,
            @PathVariable Long jobId) {

        return interviewService.getLatestInterviewForJob(
                userId,
                jobId
        );
    }


    // ==========================================
    // START INTERVIEW REQUEST
    // ==========================================

    public static class StartInterviewRequest {

        private Long userId;

        private Long jobId;

        private String profile;


        public Long getUserId() {
            return userId;
        }


        public void setUserId(Long userId) {
            this.userId = userId;
        }


        public Long getJobId() {
            return jobId;
        }


        public void setJobId(Long jobId) {
            this.jobId = jobId;
        }


        public String getProfile() {
            return profile;
        }


        public void setProfile(String profile) {
            this.profile = profile;
        }
    }


    // ==========================================
    // COMPLETE INTERVIEW REQUEST
    // ==========================================

    public static class CompleteInterviewRequest {

        private double totalScore;

        private String status;


        public double getTotalScore() {
            return totalScore;
        }


        public void setTotalScore(
                double totalScore) {

            this.totalScore = totalScore;
        }


        public String getStatus() {
            return status;
        }


        public void setStatus(String status) {

            this.status = status;
        }
    }
}
