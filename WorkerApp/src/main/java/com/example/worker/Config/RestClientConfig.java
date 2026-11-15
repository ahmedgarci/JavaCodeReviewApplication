package com.example.worker.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration 
public class RestClientConfig {
    
    @Value ("${sonarAnalyzer.url}")
    private String main_app_url;

    @Bean
    public RestClient restClient(){

        return RestClient.builder().baseUrl(main_app_url).build();

    }
}
