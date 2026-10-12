package com.example.worker.Services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.worker.Consumer.In.JobDto;
import com.example.worker.Producer.ProducerService;
import com.example.worker.Producer.Out.ReviewCompletedEvent;
import com.example.worker.Producer.Out.SonarIssueDto;
import com.example.worker.Producer.Out.SonarMetric;
import com.example.worker.Producer.Out.SonarResponseDto;
import com.example.worker.Services.ProjectCloner.GitClonerService;
import com.example.worker.Services.Sonar.SonarResultRetriverService;
import com.example.worker.Services.maven.IProcessBuilder;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j 
public class ReviewService {


    private final GitClonerService gitClonerService;
    private final IProcessBuilder sonarAnalyzer;
    private final ObjectMapper objectMapper;
    private final ProducerService producerService;
    private final SonarResultRetriverService resultRetriverService;

    public void analyze(JobDto jobDto){
        System.out.println("exec : "+jobDto.executionId()+ "p_id : "+jobDto.projectId()+ "sub: "+ jobDto.submissionId());
        Path workspace =Paths.get("workspaces",UUID.randomUUID().toString()).toAbsolutePath().normalize();

        try {

            Files.createDirectories(workspace);

            gitClonerService.cloneRepository(jobDto.url(),workspace);
            
            String projectKey = "project_"+jobDto.projectId();

            String jsonIssues = sonarAnalyzer.execute(workspace, projectKey);

            String metricsJson = resultRetriverService.getMetrics(projectKey);

            SonarMetric metrics = resultRetriverService.parseMetrics(metricsJson);

            SonarResponseDto sonarResponse = objectMapper.readValue(jsonIssues,SonarResponseDto.class);         
            
            List<SonarIssueDto> issues = sonarResponse.issues().stream() .map(issue -> new SonarIssueDto(issue.getSeverity() , issue.getComponent(),issue.getLine(), issue.getMessage(), issue.getType())).toList();            

            ReviewCompletedEvent event = new ReviewCompletedEvent(jobDto.submissionId(),jobDto.projectId(),jobDto.executionId(),issues,metrics);

            producerService.produce(event);            

        } catch (IOException e) {

            log.error("IO error while processing project {}",jobDto.projectId(),e);

        }catch(Exception e){

            log.error("Unexpected error while processing project {}",jobDto.projectId(),e);

        }finally{
            deleteAnalyzedProject(workspace);
        }

    }

    private void deleteAnalyzedProject(Path projectFolder){
        if(!Files.exists(projectFolder)) return ;
        try {
            Files.walk(projectFolder).sorted(Comparator.reverseOrder()).forEach((file)->{
            try {
                Files.deleteIfExists(file);
            } catch (IOException e) {
                 log.warn("Could not delete {}",file,e);
            }
        });
        } catch (Exception e) {
                 log.warn("Could not clear workspce {}",projectFolder.getFileName());
        }
      

    }

}
