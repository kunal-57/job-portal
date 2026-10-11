package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

@Service
public class AiService {

    private final Client client;
    
    public double extractScore(String aiResult) {

        try {

            java.util.regex.Pattern pattern =
                    java.util.regex.Pattern.compile(
                            "Score[^0-9]*([0-9]+(?:\\.[0-9]+)?)\\s*/\\s*10",
                            java.util.regex.Pattern.CASE_INSENSITIVE
                    );

            java.util.regex.Matcher matcher =
                    pattern.matcher(aiResult);

            if (matcher.find()) {

                return Double.parseDouble(
                        matcher.group(1)
                );
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return 0.0;
    }

    public AiService(
            @Value("${gemini.api.key}") String apiKey) {

        client = Client.builder()
                .apiKey(apiKey)
                .build();
    }

    public String checkAnswer(String question, String answer) {

        String prompt = """
                You are an AI interviewer.

                Evaluate the candidate's answer.

                Question:
                %s

                Candidate Answer:
                %s

                Give the result in this format:

                Score: X/10

                Feedback:
                Explain whether the answer is correct.

                Strengths:
                Mention what the candidate explained correctly.

                Improvements:
                Mention what the candidate should improve.

                Keep the response simple and suitable for a job interview.
                """.formatted(question, answer);

        int maxAttempts = 3;

        for (int attempt = 1; attempt <= maxAttempts; attempt++) {

            try {

                GenerateContentResponse response =
                        client.models.generateContent(
                                "gemini-3.5-flash",
                                prompt,
                                null
                        );

                return response.text();

            } catch (Exception e) {

                if (attempt == maxAttempts) {
                    throw e;
                }

                try {
                    Thread.sleep(attempt * 5000);
                } catch (InterruptedException ex) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("AI request interrupted", ex);
                }
            }
        }

        return "AI could not evaluate the answer.";
    }
}