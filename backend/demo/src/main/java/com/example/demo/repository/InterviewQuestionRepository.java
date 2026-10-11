package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.InterviewQuestion;

public interface InterviewQuestionRepository
        extends JpaRepository<InterviewQuestion, Long> {
}