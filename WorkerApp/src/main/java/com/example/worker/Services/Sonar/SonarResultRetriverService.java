package com.example.worker.Services.Sonar;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.example.worker.Producer.Out.SonarMetric;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SonarResultRetriverService {
    
    @Value("${sonarAnalyzer.token}")
    private String token;
    
    private final RestClient restClient;
    
    private final ObjectMapper objectMapper;
 

    public String getIssues(String projectKey){

        return restClient
                .get()
                .uri("api/issues/search?componentKeys="+projectKey)
                .header("Authorization","Bearer "+token)
                .retrieve()
                .body(String.class);
    }

    public String getMetrics(String projectKey) {
        String response =  restClient
            .get()
            .uri(uriBuilder -> uriBuilder
                .path("/api/measures/component")
                .queryParam("component", projectKey)
                .queryParam("metricKeys","bugs,vulnerabilities,code_smells,coverage")
                .build())
            .header("Authorization","Bearer "+token)
            .retrieve()
            .body(String.class);
            return response;
    }   
    
    public SonarMetric parseMetrics(String metricJson)throws Exception {

        JsonNode jsonNode = objectMapper.readTree(metricJson);
        
        JsonNode measures = jsonNode.get("component").get("measures");
        
        Map<String, Object> metricsMap = new HashMap<>();

        for(JsonNode measure : measures){
            String metric = measure.get("metric").asText();
            String value = measure.get("value").asText();
            switch (metric) {
                case "bugs" -> metricsMap.put("bugs", Long.valueOf(value));
                case "vulnerabilities" -> metricsMap.put("vulnerabilities", Long.valueOf(value));
                case "code_smells" -> metricsMap.put("codeSmells", Long.valueOf(value));
                case "coverage" -> metricsMap.put("coverage", Double.valueOf(value));
            }
        }

        SonarMetric result = objectMapper.convertValue(metricsMap, SonarMetric.class);

        return result;
    }

}
