
package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Interview;

public interface InterviewRepository
        extends JpaRepository<Interview, Long> {

    Optional<Interview> findTopByUserIdAndJobIdOrderByIdDesc(
            Long userId,
            Long jobId
    );
}

