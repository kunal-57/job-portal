package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.InterviewQuestion;
import com.example.demo.service.InterviewQuestionService;

@RestController
@RequestMapping("/api/interview-questions")
@CrossOrigin(origins = "http://localhost:5173")
public class InterviewQuestionController {

    private final InterviewQuestionService interviewQuestionService;

    public InterviewQuestionController(
            InterviewQuestionService interviewQuestionService) {

        this.interviewQuestionService = interviewQuestionService;
    }

    @PostMapping
    public InterviewQuestion saveQuestion(
            @RequestBody InterviewQuestion question) {

        return interviewQuestionService.saveQuestion(question);
    }

    @GetMapping
    public List<InterviewQuestion> getAllQuestions() {

        return interviewQuestionService.getAllQuestions();
    }

    @GetMapping("/{id}")
    public InterviewQuestion getQuestionById(
            @PathVariable Long id) {

        return interviewQuestionService.getQuestionById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteQuestion(@PathVariable Long id) {

        interviewQuestionService.deleteQuestion(id);

        return "Interview question deleted successfully";
    }
}