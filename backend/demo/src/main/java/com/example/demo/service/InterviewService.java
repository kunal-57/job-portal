
package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Interview;
import com.example.demo.repository.InterviewRepository;

@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;


    public InterviewService(
            InterviewRepository interviewRepository) {

        this.interviewRepository =
                interviewRepository;
    }


    public Interview createInterview(
            Long userId,
            Long jobId,
            String profile) {

        Interview interview =
                new Interview();

        interview.setUserId(userId);

        interview.setJobId(jobId);

        interview.setProfile(profile);

        interview.setTotalScore(0.0);

        interview.setStatus("STARTED");

        return interviewRepository.save(
                interview
        );
    }


    public Interview getInterviewById(
            Long id) {

        return interviewRepository
                .findById(id)
                .orElse(null);
    }


    // Find latest interview for a user and job
    public Interview getLatestInterviewForJob(
            Long userId,
            Long jobId) {

        return interviewRepository
                .findTopByUserIdAndJobIdOrderByIdDesc(
                        userId,
                        jobId
                )
                .orElse(null);
    }


    public Interview completeInterview(
            Long id,
            double totalScore,
            String status) {

        Interview interview =
                interviewRepository
                        .findById(id)
                        .orElse(null);


        if (interview == null) {

            return null;
        }


        interview.setTotalScore(
                totalScore
        );

        interview.setStatus(
                status
        );


        return interviewRepository.save(
                interview
        );
    }
}
