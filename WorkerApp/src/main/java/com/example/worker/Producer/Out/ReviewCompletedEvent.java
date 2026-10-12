package com.example.worker.Producer.Out;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewCompletedEvent {
    Long submissionId;
    Long projectId;
    Long executionId;
    List<SonarIssueDto> issues;
    SonarMetric metric;
}
