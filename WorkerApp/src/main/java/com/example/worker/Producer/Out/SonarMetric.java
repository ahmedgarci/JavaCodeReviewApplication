package com.example.worker.Producer.Out;

public record SonarMetric(
        Long bugs,
        Long vulnerabilities,
        Long codeSmells,
        Double coverage
    ) {}
    

