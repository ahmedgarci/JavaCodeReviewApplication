package com.example.worker.Services.ProjectCloner;

import java.nio.file.Path;

import org.eclipse.jgit.api.Git;
import org.springframework.stereotype.Service;

@Service
public class GitClonerServiceImpl implements GitClonerService{
    
    
    public void cloneRepository(String repositoryUrl,Path destination) throws Exception {
        
        Git git = Git.cloneRepository().setURI("https://github.com/ahmedgarci/projectmanagementapp.git").setDirectory(destination.toFile()).call();

        git.getRepository().resolve("HEAD").name();
    
        git.close();

    }

}
