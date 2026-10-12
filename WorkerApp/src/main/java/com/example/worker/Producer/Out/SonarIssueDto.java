package com.example.worker.Producer.Out;

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
public class SonarIssueDto {
    private String severity;
    private String component;
    private Integer line;
    private String message;
    private String type;

}
