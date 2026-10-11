package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.InterviewQuestion;
import com.example.demo.repository.InterviewQuestionRepository;

@Service
public class InterviewQuestionService {

    private final InterviewQuestionRepository interviewQuestionRepository;

    public InterviewQuestionService(
            InterviewQuestionRepository interviewQuestionRepository) {

        this.interviewQuestionRepository = interviewQuestionRepository;
    }

    public InterviewQuestion saveQuestion(InterviewQuestion question) {

        return interviewQuestionRepository.save(question);
    }

    public List<InterviewQuestion> getAllQuestions() {

        return interviewQuestionRepository.findAll();
    }

    public InterviewQuestion getQuestionById(Long id) {

        return interviewQuestionRepository.findById(id).orElse(null);
    }

    public void deleteQuestion(Long id) {

        interviewQuestionRepository.deleteById(id);
    }
}