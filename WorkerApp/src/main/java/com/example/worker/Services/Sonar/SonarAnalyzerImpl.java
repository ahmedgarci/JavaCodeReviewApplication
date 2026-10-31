package com.example.worker.Services.Sonar;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.example.worker.Services.maven.IProcessBuilder;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SonarAnalyzerImpl implements IProcessBuilder {

    private final RestClient restClient;

    @Value("${sonarAnalyzer.token}")
    private String token;

    @Value("${sonarAnalyzer.url}")
    private String sonarUrl;

    @Value("${sonarAnalyzer.network}")
    private String sonarNetwork;

    @Override
    public String execute(Path workspace, String key) throws Exception {

        Path absolutePath = workspace.toAbsolutePath().normalize();
        Path pom = absolutePath.resolve("pom.xml");
        System.out.println("Workspace = " + absolutePath);
        System.out.println("POM = " + pom);
        System.out.println("POM exists = " + Files.exists(pom));

        if (!Files.exists(pom)) {
            throw new IllegalStateException("pom.xml not found in workspace: " + absolutePath.toString());
        }
        
       ProcessBuilder builder = new ProcessBuilder(
    "docker",
    "run",
    "--rm",
    "--network",
    sonarNetwork,

    "-v",
    absolutePath.toString() + ":/workspace",

    "-w",
    "/workspace",

    "--entrypoint",
    "sh",
    "code-analyzer",

    "-c",
    "ls -la /workspace && find /workspace -maxdepth 2 -name pom.xml"
);
        
        builder.directory(absolutePath.toFile());

        builder.redirectErrorStream(true);

        Process process = builder.start();

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()))) {

            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        }

        int exitCode = process.waitFor();
        if (exitCode != 0) {
            throw new RuntimeException("Project build / Sonar analysis failed. Maven/Docker exit code: " + exitCode);        
    
        }
        String issues = getIssues(key);

        return issues;

    }

    private String getIssues(String projectKey) {

        System.out.println("retrieving issuues");
        return restClient
                .get()
                .uri("api/issues/search?componentKeys=" + projectKey)
                .header("Authorization", "Bearer "+token)
                .retrieve()
                .body(String.class);
    }

}