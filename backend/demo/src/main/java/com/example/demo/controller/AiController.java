package com.example.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.InterviewQuestion;
import com.example.demo.service.AiService;
import com.example.demo.service.InterviewQuestionService;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AiController {

    private final AiService aiService;
    private final InterviewQuestionService interviewQuestionService;
    
    

    public AiController(
            AiService aiService,
            InterviewQuestionService interviewQuestionService) {

        this.aiService = aiService;
        this.interviewQuestionService = interviewQuestionService;
    }

    @PostMapping("/check-answer")
    public InterviewQuestion checkAnswer(
            @RequestBody AnswerRequest request) {

        String aiResult;

        try {

            aiResult = aiService.checkAnswer(
                    request.getQuestion(),
                    request.getAnswer()
            );

        } catch (Exception e) {

            aiResult = "AI feedback is temporarily unavailable. "
                    + "Your answer has been saved.";
        }

        double score = aiService.extractScore(aiResult);

        InterviewQuestion interviewQuestion =
                new InterviewQuestion();

        interviewQuestion.setInterviewId(
                request.getInterviewId()
        );

        interviewQuestion.setQuestion(
                request.getQuestion()
        );

        interviewQuestion.setCandidateAnswer(
                request.getAnswer()
        );

        interviewQuestion.setFeedback(aiResult);

        interviewQuestion.setScore(score);

        return interviewQuestionService.saveQuestion(
                interviewQuestion
        );
    }

    public static class AnswerRequest {

        private Long interviewId;
        private String question;
        private String answer;

        public Long getInterviewId() {
            return interviewId;
        }

        public void setInterviewId(Long interviewId) {
            this.interviewId = interviewId;
        }

        public String getQuestion() {
            return question;
        }

        public void setQuestion(String question) {
            this.question = question;
        }

        public String getAnswer() {
            return answer;
        }

        public void setAnswer(String answer) {
            this.answer = answer;
        }
    }
}