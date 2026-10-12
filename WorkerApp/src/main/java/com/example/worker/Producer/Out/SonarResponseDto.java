package com.example.worker.Producer.Out;

import java.util.List;

public record SonarResponseDto(
    List<SonarIssueDto> issues
) {
}
