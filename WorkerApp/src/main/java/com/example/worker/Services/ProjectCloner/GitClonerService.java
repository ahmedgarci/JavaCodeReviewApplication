package com.example.worker.Services.ProjectCloner;

import java.nio.file.Path;

public interface GitClonerService {
        void cloneRepository(String repositoryUrl,Path destination) throws Exception;

}
