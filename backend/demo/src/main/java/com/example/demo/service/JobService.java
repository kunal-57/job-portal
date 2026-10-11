package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Job;
import com.example.demo.repository.JobRepository;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElse(null);
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
    
    public Job updateJob(Long id, Job job) {

        Job existingJob = jobRepository.findById(id).orElse(null);

        if (existingJob == null) {
            return null;
        }

        existingJob.setTitle(job.getTitle());
        existingJob.setDescription(job.getDescription());
        existingJob.setLocation(job.getLocation());
        existingJob.setSalary(job.getSalary());
        existingJob.setExperience(job.getExperience());
        existingJob.setJobType(job.getJobType());

        return jobRepository.save(existingJob);
    }
}