package com.example.worker.Services.maven;

import java.nio.file.Path;

public interface IProcessBuilder {
    
    String execute(Path workspace,String key) throws Exception;
}
