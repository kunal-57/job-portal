
package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long jobId;

    private String profile;

    private double totalScore;

    private String status;


    public Interview() {

    }


    public Long getId() {

        return id;
    }

    public void setId(Long id) {

        this.id = id;
    }


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


    public double getTotalScore() {

        return totalScore;
    }

    public void setTotalScore(double totalScore) {

        this.totalScore = totalScore;
    }


    public String getStatus() {

        return status;
    }

    public void setStatus(String status) {

        this.status = status;
    }
}

